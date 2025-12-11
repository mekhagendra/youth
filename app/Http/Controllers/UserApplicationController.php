<?php

namespace App\Http\Controllers;

use App\Models\UserApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserApplicationController extends Controller
{
    /**
     * Display user's applications
     */
    public function index(Request $request)
    {
        $applications = $request->user()
            ->applications()
            ->with('admin')
            ->latest()
            ->get();

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Show the application form
     */
    public function create(Request $request)
    {
        $user = $request->user();

        // Check if user can apply
        if (!$user->canApplyForMembership()) {
            return redirect()->route('dashboard')
                ->with('error', 'You are not eligible to apply for membership at this time.');
        }

        // Check for pending application
        $hasPendingApplication = $user->applications()
            ->where('status', 'Pending')
            ->exists();

        if ($hasPendingApplication) {
            return redirect()->route('applications.index')
                ->with('error', 'You already have a pending application.');
        }

        return Inertia::render('Applications/Create');
    }

    /**
     * Store a new application
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Validate eligibility
        if (!$user->canApplyForMembership()) {
            return back()->withErrors(['message' => 'You are not eligible to apply.']);
        }

        // Check for pending application
        $hasPendingApplication = $user->applications()
            ->where('status', 'Pending')
            ->exists();

        if ($hasPendingApplication) {
            return back()->withErrors(['message' => 'You already have a pending application.']);
        }

        $validated = $request->validate([
            'requested_user_type' => 'required|in:Member,Volunteer,Intern',
            'application_data' => 'nullable|array',
        ]);

        $application = $user->applications()->create($validated);

        return redirect()->route('applications.index')
            ->with('success', 'Your application has been submitted successfully.');
    }

    /**
     * Show a single application
     */
    public function show(Request $request, UserApplication $application)
    {
        // Ensure user can only view their own applications
        if ($application->user_id !== $request->user()->id) {
            abort(403);
        }

        $application->load('admin');

        return Inertia::render('Applications/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Cancel a pending application
     */
    public function destroy(Request $request, UserApplication $application)
    {
        // Ensure user can only cancel their own pending applications
        if ($application->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($application->status !== 'Pending') {
            return back()->withErrors(['message' => 'Only pending applications can be cancelled.']);
        }

        $application->delete();

        return redirect()->route('applications.index')
            ->with('success', 'Application cancelled successfully.');
    }
}
