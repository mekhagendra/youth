<?php

namespace App\Http\Controllers;

use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternshipApplicationController extends Controller
{
    public function create()
    {
        return Inertia::render('opportunities/internship');
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
            'why_internship' => 'nullable|string|max:1000',
            'field_of_interest' => 'nullable|string|max:255',
            'available_from' => 'nullable|date',
            'duration_months' => 'nullable|integer|min:1|max:12',
        ]);

        InternshipApplication::create($validated);

        return redirect()->back()->with('success', 'Your internship application has been submitted successfully!');
    }
}
