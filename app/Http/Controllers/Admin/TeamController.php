<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with(['members' => function($query) {
            $query->orderBy('team_members.rank');
        }])->ordered()->get();

        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams->map(function ($team) {
                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'description' => $team->description,
                    'is_active' => $team->is_active,
                    'display_order' => $team->display_order,
                    'members_count' => $team->members->count(),
                    'members' => $team->members->map(function ($member) {
                        return [
                            'id' => $member->id,
                            'membership_id' => $member->membership_id,
                            'name' => $member->name,
                            'designation' => $member->pivot->designation,
                            'rank' => $member->pivot->rank,
                            'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function create()
    {
        $activeMembers = Member::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'membership_id' => $member->membership_id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                ];
            });

        return Inertia::render('Admin/Teams/Create', [
            'members' => $activeMembers,
        ]);
    }

    public function store(Request $request)
    {
        // Debug logging
        \Log::info('Team store request received', [
            'user' => auth()->user()?->email,
            'is_admin' => auth()->user()?->role === 'admin',
            'request_data' => $request->all(),
        ]);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'display_order' => 'integer',
            'members' => 'array',
            'members.*.member_id' => 'required|exists:members,id',
            'members.*.designation' => 'required|string|max:255',
            'members.*.rank' => 'required|integer',
        ]);

        $team = Team::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        if (!empty($validated['members'])) {
            foreach ($validated['members'] as $member) {
                $team->members()->attach($member['member_id'], [
                    'designation' => $member['designation'],
                    'rank' => $member['rank'],
                ]);
            }
        }

        return redirect()->route('admin.teams.index')->with('success', 'Team created successfully!');
    }

    public function show(Team $team)
    {
        $team->load(['members' => function($query) {
            $query->orderBy('team_members.rank');
        }]);

        return Inertia::render('Admin/Teams/Show', [
            'team' => [
                'id' => $team->id,
                'name' => $team->name,
                'description' => $team->description,
                'is_active' => $team->is_active,
                'display_order' => $team->display_order,
                'members' => $team->members->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'membership_id' => $member->membership_id,
                        'name' => $member->name,
                        'email' => $member->email,
                        'phone' => $member->phone,
                        'address' => $member->address,
                        'description' => $member->description,
                        'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                        'designation' => $member->pivot->designation,
                        'rank' => $member->pivot->rank,
                    ];
                }),
            ],
        ]);
    }

    public function edit(Team $team)
    {
        $team->load(['members' => function($query) {
            $query->orderBy('team_members.rank');
        }]);

        $activeMembers = Member::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'membership_id' => $member->membership_id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                ];
            });

        return Inertia::render('Admin/Teams/Edit', [
            'team' => [
                'id' => $team->id,
                'name' => $team->name,
                'description' => $team->description,
                'is_active' => $team->is_active,
                'display_order' => $team->display_order,
                'members' => $team->members->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'membership_id' => $member->membership_id,
                        'name' => $member->name,
                        'email' => $member->email,
                        'phone' => $member->phone,
                        'photo' => $member->photo ? asset('storage/' . $member->photo) : null,
                        'designation' => $member->pivot->designation,
                        'rank' => $member->pivot->rank,
                    ];
                }),
            ],
            'members' => $activeMembers,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        // Log everything
        \Log::info('=== TEAM UPDATE DEBUG ===', [
            'raw_all' => $request->all(),
            'members' => $request->input('members'),
            'has_members' => $request->has('members'),
        ]);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'display_order' => 'integer',
            'members' => 'array',
            'members.*.member_id' => 'required|exists:members,id',
            'members.*.designation' => 'required|string|max:255',
            'members.*.rank' => 'required|integer',
        ]);

        \Log::info('Team update validation passed', [
            'validated' => $validated,
        ]);

        $team->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        // Sync team members
        $team->members()->detach();
        
        if (!empty($validated['members'])) {
            foreach ($validated['members'] as $member) {
                \Log::info('Attaching member to team', [
                    'member_id' => $member['member_id'],
                    'designation' => $member['designation'],
                    'rank' => $member['rank'],
                ]);
                
                $team->members()->attach($member['member_id'], [
                    'designation' => $member['designation'],
                    'rank' => $member['rank'],
                ]);
            }
        }

        \Log::info('Team update completed', [
            'team_id' => $team->id,
            'members_attached' => count($validated['members'] ?? []),
        ]);

        return redirect()->route('admin.teams.index')->with('success', 'Team updated successfully!');
    }

    public function destroy(Team $team)
    {
        $team->members()->detach();
        $team->delete();

        return redirect()->route('admin.teams.index')->with('success', 'Team deleted successfully!');
    }
}
