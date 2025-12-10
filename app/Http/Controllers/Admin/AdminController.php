<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\GalleryImage;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Double check authentication and admin role (defense in depth)
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized access.');
        }

        $stats = [
            'totalUsers' => User::count(),
            'totalGalleryImages' => GalleryImage::count(),
            'totalActivities' => Activity::count(),
            'upcomingActivities' => Activity::upcoming()->count(),
            'recentUsers' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at'])
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}