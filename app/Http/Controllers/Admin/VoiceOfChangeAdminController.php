<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VoiceOfChange;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoiceOfChangeAdminController extends Controller
{
    /**
     * Display a listing of all voice of change messages.
     */
    public function index()
    {
        $messages = VoiceOfChange::with('user')
            ->latest()
            ->get();

        return Inertia::render('Admin/VoiceOfChanges/Index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Display the specified message.
     */
    public function show(VoiceOfChange $voiceOfChange)
    {
        $voiceOfChange->load('user');

        return Inertia::render('Admin/VoiceOfChanges/Show', [
            'message' => $voiceOfChange,
        ]);
    }

    /**
     * Approve a message for publishing.
     */
    public function approve(Request $request, VoiceOfChange $voiceOfChange)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string',
        ]);

        $voiceOfChange->update([
            'status' => 'approved',
            'admin_notes' => $validated['admin_notes'] ?? null,
            'published_at' => now(),
        ]);

        return redirect()->route('admin.voice-of-changes.index')
            ->with('success', 'Message approved and published successfully.');
    }

    /**
     * Reject a message.
     */
    public function reject(Request $request, VoiceOfChange $voiceOfChange)
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string',
        ]);

        $voiceOfChange->update([
            'status' => 'rejected',
            'admin_notes' => $validated['admin_notes'],
        ]);

        return redirect()->route('admin.voice-of-changes.index')
            ->with('success', 'Message rejected. User will be notified.');
    }

    /**
     * Unpublish an approved message.
     */
    public function unpublish(VoiceOfChange $voiceOfChange)
    {
        $voiceOfChange->update([
            'status' => 'pending',
            'published_at' => null,
        ]);

        return redirect()->route('admin.voice-of-changes.index')
            ->with('success', 'Message unpublished successfully.');
    }

    /**
     * Remove the specified message from storage.
     */
    public function destroy(VoiceOfChange $voiceOfChange)
    {
        $voiceOfChange->delete();

        return redirect()->route('admin.voice-of-changes.index')
            ->with('success', 'Message deleted successfully.');
    }
}
