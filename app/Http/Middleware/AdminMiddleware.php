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
            return redirect()->route('login')->with('error', 'Please login to access admin area.');
        }

        // Check if user has admin role
        $user = Auth::user();
        if (!$user || $user->role !== 'admin') {
            // Log unauthorized access attempt
            logger('Unauthorized admin access attempt by user: ' . ($user ? $user->email : 'unknown'));
            
            return redirect()->route('dashboard')->with('error', 'Access denied. Admin privileges required.');
        }

        return $next($request);
    }
}