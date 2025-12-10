<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Resource::ordered()->get()->map(function ($resource) {
            return [
                'id' => $resource->id,
                'name' => $resource->name,
                'description' => $resource->description,
                'publisher' => $resource->publisher,
                'published_date' => $resource->published_date->format('Y-m-d'),
                'file_type' => $resource->file_type,
                'file_size' => $resource->file_size,
                'category' => $resource->category,
                'download_count' => $resource->download_count,
                'is_active' => $resource->is_active,
                'display_order' => $resource->display_order,
            ];
        });

        return Inertia::render('Admin/Resources/Index', [
            'resources' => $resources,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Resources/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'publisher' => 'required|string|max:255',
            'published_date' => 'required|date',
            'file' => 'required|file|max:102400', // 100MB max
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);

        $file = $request->file('file');
        $filePath = $file->store('resources', 'public');
        
        // Get file info
        $fileSize = round($file->getSize() / 1024, 2); // KB
        if ($fileSize > 1024) {
            $fileSize = round($fileSize / 1024, 2) . ' MB';
        } else {
            $fileSize = $fileSize . ' KB';
        }

        Resource::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'publisher' => $validated['publisher'],
            'published_date' => $validated['published_date'],
            'file_type' => $file->getClientOriginalExtension(),
            'file_path' => $filePath,
            'file_size' => $fileSize,
            'category' => $validated['category'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        return redirect()->route('admin.resources.index')->with('success', 'Resource created successfully!');
    }

    public function show(Resource $resource)
    {
        return Inertia::render('Admin/Resources/Show', [
            'resource' => [
                'id' => $resource->id,
                'name' => $resource->name,
                'description' => $resource->description,
                'publisher' => $resource->publisher,
                'published_date' => $resource->published_date->format('Y-m-d'),
                'file_type' => $resource->file_type,
                'file_path' => asset('storage/' . $resource->file_path),
                'file_size' => $resource->file_size,
                'category' => $resource->category,
                'download_count' => $resource->download_count,
                'is_active' => $resource->is_active,
                'display_order' => $resource->display_order,
            ],
        ]);
    }

    public function edit(Resource $resource)
    {
        return Inertia::render('Admin/Resources/Edit', [
            'resource' => [
                'id' => $resource->id,
                'name' => $resource->name,
                'description' => $resource->description,
                'publisher' => $resource->publisher,
                'published_date' => $resource->published_date->format('Y-m-d'),
                'file_type' => $resource->file_type,
                'file_path' => asset('storage/' . $resource->file_path),
                'file_size' => $resource->file_size,
                'category' => $resource->category,
                'is_active' => $resource->is_active,
                'display_order' => $resource->display_order,
            ],
        ]);
    }

    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'publisher' => 'required|string|max:255',
            'published_date' => 'required|date',
            'file' => 'nullable|file|max:102400', // 100MB max
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);

        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'publisher' => $validated['publisher'],
            'published_date' => $validated['published_date'],
            'category' => $validated['category'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'display_order' => $validated['display_order'] ?? 0,
        ];

        // Handle file upload if new file provided
        if ($request->hasFile('file')) {
            // Delete old file
            if ($resource->file_path) {
                Storage::disk('public')->delete($resource->file_path);
            }

            $file = $request->file('file');
            $filePath = $file->store('resources', 'public');
            
            // Get file info
            $fileSize = round($file->getSize() / 1024, 2); // KB
            if ($fileSize > 1024) {
                $fileSize = round($fileSize / 1024, 2) . ' MB';
            } else {
                $fileSize = $fileSize . ' KB';
            }

            $data['file_type'] = $file->getClientOriginalExtension();
            $data['file_path'] = $filePath;
            $data['file_size'] = $fileSize;
        }

        $resource->update($data);

        return redirect()->route('admin.resources.index')->with('success', 'Resource updated successfully!');
    }

    public function destroy(Resource $resource)
    {
        // Delete file from storage
        if ($resource->file_path) {
            Storage::disk('public')->delete($resource->file_path);
        }

        $resource->delete();

        return redirect()->route('admin.resources.index')->with('success', 'Resource deleted successfully!');
    }

    public function download(Resource $resource)
    {
        $resource->incrementDownloads();
        
        $filePath = storage_path('app/public/' . $resource->file_path);
        
        if (!file_exists($filePath)) {
            abort(404);
        }

        return response()->download($filePath, $resource->name . '.' . $resource->file_type);
    }
}
