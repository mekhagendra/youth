<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $galleryImages = \App\Models\GalleryImage::active()->ordered()->limit(6)->get();
    $activities = \App\Models\Activity::active()->ordered()->limit(4)->get();
    return Inertia::render('welcome', [
        'galleryImages' => $galleryImages,
        'activities' => $activities
    ]);
})->name('home');

Route::get('/activities', function () {
    $activities = \App\Models\Activity::active()->ordered()->get();
    return Inertia::render('activities', [
        'activities' => $activities
    ]);
})->name('activities');

Route::get('/activities/{id}', function ($id) {
    return Inertia::render('activity-detail', [
        'activityId' => $id
    ]);
})->name('activity-detail');

Route::get('/gallery', function () {
    $images = \App\Models\GalleryImage::active()->ordered()->get();
    return Inertia::render('gallery', [
        'images' => $images
    ]);
})->name('gallery');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // Redirect admin users to admin dashboard
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin Routes
Route::get('/opportunities/volunteer', function () {
    return Inertia::render('opportunities/volunteer');
})->name('volunteer-opportunities');

Route::get('/members/signup', function () {
    return Inertia::render('members/signup');
})->name('members.signup');

Route::get('/resources', function () {
    $resources = \App\Models\Resource::active()->ordered()->get();
    return Inertia::render('resources', [
        'resources' => $resources
    ]);
})->name('resources');

Route::get('/resources/{resource}/download', [\App\Http\Controllers\Admin\ResourceController::class, 'download'])->name('resources.download');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

Route::get('/ourOrganization', function () {
    return Inertia::render('ourOrganization');
})->name('ourOrganization');

Route::get('/ourTeam', function () {
    $teams = \App\Models\Team::with(['members' => function($query) {
        $query->where('is_active', true)
              ->orderBy('team_members.rank');
    }])
    ->where('is_active', true)
    ->ordered()
    ->get()
    ->map(function ($team) {
        return [
            'id' => $team->id,
            'name' => $team->name,
            'description' => $team->description,
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
                    'show_email' => $member->show_email,
                    'show_phone' => $member->show_phone,
                ];
            }),
        ];
    });
    
    return Inertia::render('ourTeam', [
        'teams' => $teams
    ]);
})->name('ourTeam');

// API Routes
Route::prefix('api')->group(function () {
    Route::get('/supporters', [\App\Http\Controllers\Api\SupporterController::class, 'index']);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // User Management
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    
    // Gallery Management
    Route::resource('gallery', \App\Http\Controllers\Admin\GalleryImageController::class);
    
    // Activity Management
    Route::resource('activities', \App\Http\Controllers\Admin\ActivityController::class);
    
    // Supporter Management
    Route::resource('supporters', \App\Http\Controllers\Admin\SupporterController::class);
    
    // Member Management
    Route::resource('members', \App\Http\Controllers\Admin\MemberController::class);
    Route::post('/members/{member}/activate', [\App\Http\Controllers\Admin\MemberController::class, 'activate'])->name('members.activate');
    Route::post('/members/{member}/deactivate', [\App\Http\Controllers\Admin\MemberController::class, 'deactivate'])->name('members.deactivate');
    
    // Team Management
    Route::resource('teams', \App\Http\Controllers\Admin\TeamController::class);
    
    // Resource Management
    Route::resource('resources', \App\Http\Controllers\Admin\ResourceController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Test routes for error pages (only for development)
if (app()->environment(['local', 'testing'])) {
    Route::get('/test-errors/{type}', function ($type) {
        switch ($type) {
            case '404':
                abort(404);
                break;
            case '403':
                abort(403);
                break;
            case '500':
                throw new \Exception('Test server error');
                break;
            case '503':
                abort(503);
                break;
            default:
                abort(404);
        }
    })->name('test-errors');
}

// Fallback route for 404 errors - must be last
Route::fallback(function () {
    return \Inertia\Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
});
