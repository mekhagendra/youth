<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
     * USER SIGNUP (self-registration)
     * Default: is_active = false, is_self_registered = true
     */
    public function signup(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:members,email',
            'phone'       => 'nullable|string|max:50',
            'address'     => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|image|max:2048',
        ]);

        $data['membership_id'] = $this->generateMembershipId();
        $data['member_since']  = now();
        $data['is_active']     = false;
        $data['is_self_registered'] = true;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member = Member::create($data);

        return response()->json([
            'message' => 'Signup successful. Your membership is pending activation by admin.',
            'member'  => $member,
        ], 201);
    }

    /**
     * ADMIN: list all members
     */
    public function index()
    {
        return Member::orderBy('created_at', 'desc')->get();
    }

    /**
     * ADMIN: create/enroll member directly
     */
    public function adminStore(Request $request)
    {
        $data = $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|email|unique:members,email',
            'phone'             => 'nullable|string|max:50',
            'address'           => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'is_active'         => 'boolean',
            'is_lifetime_member'=> 'boolean',
            'show_phone'        => 'boolean',
            'show_email'        => 'boolean',
            'photo'             => 'nullable|image|max:2048',
        ]);

        $data['membership_id'] = $this->generateMembershipId();
        $data['member_since']  = now();
        $data['is_self_registered'] = false;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member = Member::create($data);

        return response()->json($member, 201);
    }

    /**
     * PUBLIC: view a member (with privacy respected)
     */
    public function showPublic(string $membershipId)
    {
        $member = Member::where('membership_id', $membershipId)->firstOrFail();

        return response()->json([
            'membership_id'      => $member->membership_id,
            'name'               => $member->name,
            'member_since'       => $member->member_since,
            'description'        => $member->description,
            'photo'              => $member->photo ? asset('storage/' . $member->photo) : null,
            'is_lifetime_member' => $member->is_lifetime_member,

            // Apply visibility rules
            'phone' => $member->show_phone ? $member->phone : null,
            'email' => $member->show_email ? $member->email : null,
        ]);
    }

    /**
     * ADMIN: view full details of a member
     */
    public function showAdmin(string $membershipId)
    {
        $member = Member::where('membership_id', $membershipId)->firstOrFail();

        // Admin sees everything
        return response()->json($member);
    }

    /**
     * MEMBER (or ADMIN): update profile
     * Allowed: email, phone, photo, description, show_phone, show_email, address
     */
    public function updateProfile(Request $request, Member $member)
    {
        $data = $request->validate([
            'email'       => 'nullable|email|unique:members,email,' . $member->id,
            'phone'       => 'nullable|string|max:50',
            'address'     => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'show_phone'  => 'boolean',
            'show_email'  => 'boolean',
            'photo'       => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Optionally delete old photo
            if ($member->photo && Storage::disk('public')->exists($member->photo)) {
                Storage::disk('public')->delete($member->photo);
            }

            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member->update($data);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'member'  => $member,
        ]);
    }

    /**
     * ADMIN: delete member
     */
    public function destroy(Member $member)
    {
        if ($member->photo && Storage::disk('public')->exists($member->photo)) {
            Storage::disk('public')->delete($member->photo);
        }

        $member->delete();

        return response()->json(null, 204);
    }
}
