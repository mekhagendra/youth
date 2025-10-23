<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function __construct()
    {
        // Security will be handled by route middleware
    }

    public function index()
    {
        // Additional security check
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized access.');
        }
        
        $contents = Content::with('user')->orderBy('created_at', 'desc')->paginate(10);
        
        return Inertia::render('Admin/Content/Index', [
            'contents' => $contents
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Content/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:page,post,news,event',
            'status' => 'boolean',
            'meta_description' => 'nullable|string|max:500',
        ]);

        $slug = Str::slug($request->title);
        
        // Ensure slug is unique
        $originalSlug = $slug;
        $counter = 1;
        while (Content::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        Content::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->input('content'),
            'type' => $request->type,
            'status' => $request->status ?? true,
            'meta_description' => $request->meta_description,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('admin.content.index')->with('success', 'Content created successfully.');
    }

    public function show(Content $content)
    {
        return Inertia::render('Admin/Content/Show', [
            'content' => $content->load('user')
        ]);
    }

    public function edit(Content $content)
    {
        return Inertia::render('Admin/Content/Edit', [
            'content' => $content
        ]);
    }

    public function update(Request $request, Content $content)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:page,post,news,event',
            'status' => 'boolean',
            'meta_description' => 'nullable|string|max:500',
        ]);

        // Update slug if title changed
        $slug = $content->slug;
        if ($content->title !== $request->title) {
            $slug = Str::slug($request->title);
            
            // Ensure slug is unique
            $originalSlug = $slug;
            $counter = 1;
            while (Content::where('slug', $slug)->where('id', '!=', $content->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        $content->update([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->input('content'),
            'type' => $request->type,
            'status' => $request->status ?? true,
            'meta_description' => $request->meta_description,
        ]);

        return redirect()->route('admin.content.index')->with('success', 'Content updated successfully.');
    }

    public function destroy(Content $content)
    {
        $content->delete();

        return redirect()->route('admin.content.index')->with('success', 'Content deleted successfully.');
    }
}
