<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SupporterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supporters = Supporter::ordered()->paginate(15);
        
        return Inertia::render('Admin/Supporters/Index', [
            'supporters' => $supporters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Supporters/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        // Handle file upload
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('supporters', 'public');
        }

        Supporter::create([
            'name' => $validated['name'],
            'logo_path' => $logoPath,
            'website_url' => $validated['website_url'],
            'display_order' => $validated['display_order'],
            'is_active' => $request->boolean('is_active', true)
        ]);

        return redirect()->route('admin.supporters.index')
            ->with('success', 'Supporter created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supporter $supporter)
    {
        return Inertia::render('Admin/Supporters/Edit', [
            'supporter' => $supporter
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supporter $supporter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        // Handle file upload if new logo is provided
        $logoPath = $supporter->logo_path;
        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }
            $logoPath = $request->file('logo')->store('supporters', 'public');
        }

        $supporter->update([
            'name' => $validated['name'],
            'logo_path' => $logoPath,
            'website_url' => $validated['website_url'],
            'display_order' => $validated['display_order'],
            'is_active' => $request->boolean('is_active', true)
        ]);

        return redirect()->route('admin.supporters.index')
            ->with('success', 'Supporter updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supporter $supporter)
    {
        // Delete logo file
        if ($supporter->logo_path && Storage::disk('public')->exists($supporter->logo_path)) {
            Storage::disk('public')->delete($supporter->logo_path);
        }

        $supporter->delete();

        return redirect()->route('admin.supporters.index')
            ->with('success', 'Supporter deleted successfully.');
    }
}
