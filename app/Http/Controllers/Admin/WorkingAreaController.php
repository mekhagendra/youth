<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorkingArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WorkingAreaController extends Controller
{
    public function index()
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $workingAreas = WorkingArea::ordered()->get()->map(function ($area) {
            return [
                'id' => $area->id,
                'title' => $area->title,
                'slug' => $area->slug,
                'description' => Str::limit(strip_tags($area->description), 100),
                'image_url' => $area->image_url,
                'is_active' => $area->is_active,
                'display_order' => $area->display_order,
                'created_at' => $area->created_at->format('Y-m-d'),
            ];
        });

        return Inertia::render('Admin/WorkingAreas/Index', [
            'workingAreas' => $workingAreas,
        ]);
    }

    public function create()
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        return Inertia::render('Admin/WorkingAreas/Create');
    }

    public function store(Request $request)
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:working_areas,slug',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer|min:0',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('working-areas', 'public');
            $validated['image_path'] = $imagePath;
        }

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set defaults
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['display_order'] = $validated['display_order'] ?? 0;

        WorkingArea::create($validated);

        return redirect()->route('admin.working-areas.index')
            ->with('success', 'Working area created successfully.');
    }

    public function show(WorkingArea $workingArea)
    {
        return Inertia::render('Admin/WorkingAreas/Show', [
            'workingArea' => [
                'id' => $workingArea->id,
                'title' => $workingArea->title,
                'slug' => $workingArea->slug,
                'description' => $workingArea->description,
                'image_url' => $workingArea->image_url,
                'is_active' => $workingArea->is_active,
                'display_order' => $workingArea->display_order,
                'created_at' => $workingArea->created_at->format('Y-m-d H:i'),
                'updated_at' => $workingArea->updated_at->format('Y-m-d H:i'),
            ]
        ]);
    }

    public function edit(WorkingArea $workingArea)
    {
        return Inertia::render('Admin/WorkingAreas/Edit', [
            'workingArea' => [
                'id' => $workingArea->id,
                'title' => $workingArea->title,
                'slug' => $workingArea->slug,
                'description' => $workingArea->description,
                'image_url' => $workingArea->image_url,
                'is_active' => $workingArea->is_active,
                'display_order' => $workingArea->display_order,
            ]
        ]);
    }

    public function update(Request $request, WorkingArea $workingArea)
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:working_areas,slug,' . $workingArea->id,
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer|min:0',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($workingArea->image_path) {
                Storage::disk('public')->delete($workingArea->image_path);
            }
            $imagePath = $request->file('image')->store('working-areas', 'public');
            $validated['image_path'] = $imagePath;
        }

        // Generate slug if changed and not provided
        if ($workingArea->title !== $validated['title'] && empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $workingArea->update($validated);

        return redirect()->route('admin.working-areas.index')
            ->with('success', 'Working area updated successfully.');
    }

    public function destroy(WorkingArea $workingArea)
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        // Delete image if exists
        if ($workingArea->image_path) {
            Storage::disk('public')->delete($workingArea->image_path);
        }

        $workingArea->delete();

        return redirect()->route('admin.working-areas.index')
            ->with('success', 'Working area deleted successfully.');
    }
}
