<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VolunteerApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VolunteerApplicationAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = VolunteerApplication::query()->recent();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $applications = $query->paginate(20);

        return Inertia::render('Admin/VolunteerApplications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(VolunteerApplication $application)
    {
        return Inertia::render('Admin/VolunteerApplications/Show', [
            'application' => $application,
        ]);
    }

    public function updateStatus(Request $request, VolunteerApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return redirect()->route('admin.volunteer-applications.show', $application)
            ->with('success', 'Application status updated successfully!');
    }

    public function destroy(VolunteerApplication $application)
    {
        $application->delete();

        return redirect()->route('admin.volunteer-applications.index')
            ->with('success', 'Application deleted successfully!');
    }
}
