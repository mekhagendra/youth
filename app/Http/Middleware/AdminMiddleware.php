<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            if ($request->expectsJson() || $request->inertia()) {
                abort(403, 'Unauthenticated');
            }
            return redirect()->route('login')->with('error', 'Please login to access admin area.');
        }

        // Check if user has admin role
        $user = Auth::user();
        if (!$user || $user->role !== 'admin') {
            // Log unauthorized access attempt
            logger('Unauthorized admin access attempt', [
                'user_email' => $user ? $user->email : 'unknown',
                'user_role' => $user ? $user->role : 'none',
                'url' => $request->url(),
            ]);
            
            if ($request->expectsJson() || $request->inertia()) {
                abort(403, 'Admin privileges required');
            }
            
            return redirect()->route('dashboard')->with('error', 'Access denied. Admin privileges required.');
        }

        return $next($request);
    }
}