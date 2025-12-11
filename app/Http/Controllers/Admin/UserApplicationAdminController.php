<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserApplicationAdminController extends Controller
{
    /**
     * Display all applications with stats
     */
    public function index(Request $request)
    {
        $query = UserApplication::with(['user', 'admin']);

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by requested type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('requested_user_type', $request->type);
        }

        $applications = $query->latest()->paginate(15);

        // Get stats
        $stats = [
            'total' => UserApplication::count(),
            'pending' => UserApplication::where('status', 'Pending')->count(),
            'approved' => UserApplication::where('status', 'Approved')->count(),
            'rejected' => UserApplication::where('status', 'Rejected')->count(),
        ];

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'stats' => $stats,
            'filters' => [
                'status' => $request->status ?? 'all',
                'type' => $request->type ?? 'all',
            ],
        ]);
    }

    /**
     * Show a single application
     */
    public function show(UserApplication $application)
    {
        $application->load(['user', 'admin']);

        return Inertia::render('Admin/Applications/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Approve an application
     */
    public function approve(Request $request, UserApplication $application)
    {
        if ($application->status !== 'Pending') {
            return back()->withErrors(['message' => 'Only pending applications can be approved.']);
        }

        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        DB::transaction(function () use ($application, $validated, $request) {
            // Update application
            $application->update([
                'status' => 'Approved',
                'admin_notes' => $validated['admin_notes'] ?? null,
                'admin_id' => $request->user()->id,
                'processed_at' => now(),
            ]);

            // Update user
            $user = $application->user;
            $user->user_type = $application->requested_user_type;
            $user->status = 'Active';
            
            // Generate membership number if applicable
            if ($user->hasMembershipNumber() && !$user->membership_number) {
                $user->membership_number = $this->generateMembershipNumber($application->requested_user_type);
            }
            
            $user->save();
        });

        return redirect()->route('admin.applications.index')
            ->with('success', 'Application approved successfully.');
    }

    /**
     * Reject an application
     */
    public function reject(Request $request, UserApplication $application)
    {
        if ($application->status !== 'Pending') {
            return back()->withErrors(['message' => 'Only pending applications can be rejected.']);
        }

        $validated = $request->validate([
            'admin_notes' => 'required|string|max:1000',
        ]);

        $application->update([
            'status' => 'Rejected',
            'admin_notes' => $validated['admin_notes'],
            'admin_id' => $request->user()->id,
            'processed_at' => now(),
        ]);

        return redirect()->route('admin.applications.index')
            ->with('success', 'Application rejected.');
    }

    /**
     * Delete an application
     */
    public function destroy(UserApplication $application)
    {
        $application->delete();

        return redirect()->route('admin.applications.index')
            ->with('success', 'Application deleted successfully.');
    }

    /**
     * Generate membership number based on type
     */
    private function generateMembershipNumber(string $type): string
    {
        $prefix = match($type) {
            'Member' => 'M',
            'Volunteer' => 'V',
            'Intern' => 'I',
            'Employee' => 'E',
            default => 'M',
        };

        // Get the latest number for this type
        $latest = DB::table('users')
            ->where('membership_number', 'like', $prefix . '%')
            ->orderByRaw('CAST(SUBSTR(membership_number, 2) AS INTEGER) DESC')
            ->value('membership_number');

        $number = 1;
        if ($latest) {
            $number = (int) substr($latest, 1) + 1;
        }

        return $prefix . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}
