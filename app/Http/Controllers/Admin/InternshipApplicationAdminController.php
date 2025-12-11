<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternshipApplicationAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = InternshipApplication::query()->recent();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $applications = $query->paginate(20);

        return Inertia::render('Admin/InternshipApplications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(InternshipApplication $application)
    {
        return Inertia::render('Admin/InternshipApplications/Show', [
            'application' => $application,
        ]);
    }

    public function updateStatus(Request $request, InternshipApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return redirect()->route('admin.internship-applications.show', $application)
            ->with('success', 'Application status updated successfully!');
    }

    public function destroy(InternshipApplication $application)
    {
        $application->delete();

        return redirect()->route('admin.internship-applications.index')
            ->with('success', 'Application deleted successfully!');
    }
}
