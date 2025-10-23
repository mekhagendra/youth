<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activities = Activity::with('user')
            ->ordered()
            ->paginate(10);

        return Inertia::render('Admin/Activities/Index', [
            'activities' => $activities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Activities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'category' => ['required', Rule::in(['workshop', 'seminar', 'training', 'community', 'awareness'])],
            'participants' => 'nullable|integer|min:1',
            'organizer' => 'required|string|max:255',
            'status' => ['required', Rule::in(['upcoming', 'ongoing', 'completed'])],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activities', 'public');
            $validated['image_path'] = $imagePath;
        }

        // Set user_id and defaults
        $validated['user_id'] = Auth::id();
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        Activity::create($validated);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Show', [
            'activity' => $activity->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Edit', [
            'activity' => $activity
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'category' => ['required', Rule::in(['workshop', 'seminar', 'training', 'community', 'awareness'])],
            'participants' => 'nullable|integer|min:1',
            'organizer' => 'required|string|max:255',
            'status' => ['required', Rule::in(['upcoming', 'ongoing', 'completed'])],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        // Handle image upload if new image is provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($activity->image_path) {
                Storage::disk('public')->delete($activity->image_path);
            }
            
            $imagePath = $request->file('image')->store('activities', 'public');
            $validated['image_path'] = $imagePath;
        }

        $validated['is_active'] = $validated['is_active'] ?? false;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        $activity->update($validated);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        // Delete image file
        if ($activity->image_path) {
            Storage::disk('public')->delete($activity->image_path);
        }

        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity deleted successfully.');
    }
}
