<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:500',
            'message' => 'required|string|max:5000',
        ]);

        // Log the contact form submission
        Log::info('Contact form submission', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
        ]);

        // TODO: Send email notification to admin
        // You can implement email sending here later
        // For now, we'll just log the submission

        /*
        Example email implementation:
        
        Mail::send('emails.contact', $validated, function ($message) use ($validated) {
            $message->to('info@youthinitiative.org.np')
                    ->subject('New Contact Form Submission: ' . $validated['subject'])
                    ->replyTo($validated['email'], $validated['name']);
        });
        */

        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}
