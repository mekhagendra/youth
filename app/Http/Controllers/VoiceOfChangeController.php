<?php

namespace App\Http\Controllers;

use App\Models\VoiceOfChange;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoiceOfChangeController extends Controller
{
    /**
     * Display a listing of the user's voice of change messages.
     */
    public function index()
    {
        $messages = auth()->user()->voiceOfChanges()
            ->latest()
            ->get();

        return Inertia::render('voice-of-changes/Index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Show the form for creating a new message.
     */
    public function create()
    {
        return Inertia::render('voice-of-changes/Create');
    }

    /**
     * Store a newly created message in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        auth()->user()->voiceOfChanges()->create([
            'title' => $validated['title'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        return redirect()->route('voice-of-changes.index')
            ->with('success', 'Your message has been submitted for review.');
    }

    /**
     * Display the specified message.
     */
    public function show(VoiceOfChange $voiceOfChange)
    {
        // Ensure user can only view their own messages
        if ($voiceOfChange->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('voice-of-changes/Show', [
            'message' => $voiceOfChange,
        ]);
    }

    /**
     * Show the form for editing the specified message.
     */
    public function edit(VoiceOfChange $voiceOfChange)
    {
        // Ensure user can only edit their own messages
        if ($voiceOfChange->user_id !== auth()->id()) {
            abort(403);
        }

        // Only allow editing pending or rejected messages
        if (!in_array($voiceOfChange->status, ['pending', 'rejected'])) {
            return redirect()->route('voice-of-changes.show', $voiceOfChange)
                ->with('error', 'You can only edit pending or rejected messages.');
        }

        return Inertia::render('voice-of-changes/Edit', [
            'message' => $voiceOfChange,
        ]);
    }

    /**
     * Update the specified message in storage.
     */
    public function update(Request $request, VoiceOfChange $voiceOfChange)
    {
        // Ensure user can only update their own messages
        if ($voiceOfChange->user_id !== auth()->id()) {
            abort(403);
        }

        // Only allow updating pending or rejected messages
        if (!in_array($voiceOfChange->status, ['pending', 'rejected'])) {
            return redirect()->route('voice-of-changes.show', $voiceOfChange)
                ->with('error', 'You can only edit pending or rejected messages.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $voiceOfChange->update([
            'title' => $validated['title'],
            'message' => $validated['message'],
            'status' => 'pending', // Reset to pending after edit
        ]);

        return redirect()->route('voice-of-changes.index')
            ->with('success', 'Your message has been updated and resubmitted for review.');
    }

    /**
     * Remove the specified message from storage.
     */
    public function destroy(VoiceOfChange $voiceOfChange)
    {
        // Ensure user can only delete their own messages
        if ($voiceOfChange->user_id !== auth()->id()) {
            abort(403);
        }

        // Only allow deleting pending or rejected messages
        if (!in_array($voiceOfChange->status, ['pending', 'rejected'])) {
            return redirect()->route('voice-of-changes.index')
                ->with('error', 'You can only delete pending or rejected messages.');
        }

        $voiceOfChange->delete();

        return redirect()->route('voice-of-changes.index')
            ->with('success', 'Message deleted successfully.');
    }
}
