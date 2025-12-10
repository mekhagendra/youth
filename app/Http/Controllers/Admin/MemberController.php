<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Generate a membership ID like MB00001, MB00002, ...
     */
    protected function generateMembershipId(): string
    {
        $count = Member::count() + 1;
        return 'MB' . str_pad($count, 5, '0', STR_PAD_LEFT);
    }

    /**
     * Display a listing of the members.
     */
    public function index()
    {
        $members = Member::orderBy('created_at', 'desc')->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'membership_id' => $member->membership_id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'member_since' => $member->member_since?->format('Y-m-d'),
                'is_active' => $member->is_active,
                'is_lifetime_member' => $member->is_lifetime_member,
                'is_self_registered' => $member->is_self_registered,
                'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
            ];
        });

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
        ]);
    }

    /**
     * Show the form for creating a new member.
     */
    public function create()
    {
        return Inertia::render('Admin/Members/Create');
    }

    /**
     * Store a newly created member in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_lifetime_member' => 'boolean',
            'show_phone' => 'boolean',
            'show_email' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data['membership_id'] = $this->generateMembershipId();
        $data['member_since'] = now();
        $data['is_self_registered'] = false;
        $data['is_active'] = $data['is_active'] ?? true;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        Member::create($data);

        return redirect()->route('admin.members.index')
            ->with('success', 'Member created successfully.');
    }

    /**
     * Display the specified member.
     */
    public function show(Member $member)
    {
        return Inertia::render('Admin/Members/Show', [
            'member' => [
                'id' => $member->id,
                'membership_id' => $member->membership_id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'address' => $member->address,
                'description' => $member->description,
                'member_since' => $member->member_since?->format('Y-m-d'),
                'is_active' => $member->is_active,
                'is_lifetime_member' => $member->is_lifetime_member,
                'is_self_registered' => $member->is_self_registered,
                'show_phone' => $member->show_phone,
                'show_email' => $member->show_email,
                'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                'created_at' => $member->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $member->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified member.
     */
    public function edit(Member $member)
    {
        return Inertia::render('Admin/Members/Edit', [
            'member' => [
                'id' => $member->id,
                'membership_id' => $member->membership_id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'address' => $member->address,
                'description' => $member->description,
                'member_since' => $member->member_since?->format('Y-m-d'),
                'is_active' => $member->is_active,
                'is_lifetime_member' => $member->is_lifetime_member,
                'show_phone' => $member->show_phone,
                'show_email' => $member->show_email,
                'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
            ],
        ]);
    }

    /**
     * Update the specified member in storage.
     */
    public function update(Request $request, Member $member)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email,' . $member->id,
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_lifetime_member' => 'boolean',
            'show_phone' => 'boolean',
            'show_email' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($member->photo && Storage::disk('public')->exists($member->photo)) {
                Storage::disk('public')->delete($member->photo);
            }

            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member->update($data);

        return redirect()->route('admin.members.index')
            ->with('success', 'Member updated successfully.');
    }

    /**
     * Remove the specified member from storage.
     */
    public function destroy(Member $member)
    {
        if ($member->photo && Storage::disk('public')->exists($member->photo)) {
            Storage::disk('public')->delete($member->photo);
        }

        $member->delete();

        return redirect()->route('admin.members.index')
            ->with('success', 'Member deleted successfully.');
    }

    /**
     * Activate a member (change is_active to true)
     */
    public function activate(Member $member)
    {
        $member->update(['is_active' => true]);

        return redirect()->back()
            ->with('success', 'Member activated successfully.');
    }

    /**
     * Deactivate a member (change is_active to false)
     */
    public function deactivate(Member $member)
    {
        $member->update(['is_active' => false]);

        return redirect()->back()
            ->with('success', 'Member deactivated successfully.');
    }
}
