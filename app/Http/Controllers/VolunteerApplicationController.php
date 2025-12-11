<?php

namespace App\Http\Controllers;

use App\Models\VolunteerApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VolunteerApplicationController extends Controller
{
    public function create()
    {
        return Inertia::render('opportunities/volunteer');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'dob' => 'required|date',
            'address' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact_number' => 'required|string|max:20',
            'emergency_contact' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'education_level' => 'nullable|string|max:255',
            'why_volunteer' => 'nullable|string|max:1000',
        ]);

        VolunteerApplication::create($validated);

        return redirect()->back()->with('success', 'Your volunteer application has been submitted successfully!');
    }
}
