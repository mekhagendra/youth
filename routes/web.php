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
    $activity = \App\Models\Activity::findOrFail($id);
    return Inertia::render('activity-detail', [
        'activity' => [
            'id' => $activity->id,
            'title' => $activity->title,
            'description' => $activity->description,
            'content' => $activity->content,
            'date' => $activity->date->format('Y-m-d'),
            'location' => $activity->location,
            'participants' => $activity->participants,
            'image' => $activity->image_path ? asset('storage/' . $activity->image_path) : asset('images/aboutOurOrgImage.jpg'),
            'category' => ucfirst($activity->category),
            'organizer' => $activity->organizer,
            'status' => $activity->status,
        ]
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
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Voice of Changes - Now all authenticated users can submit
    Route::resource('voice-of-changes', \App\Http\Controllers\VoiceOfChangeController::class);

    // User Applications - Guest users can apply for membership
    Route::resource('applications', \App\Http\Controllers\UserApplicationController::class)
        ->only(['index', 'create', 'store', 'show', 'destroy']);
});

// Admin Routes
Route::get('/opportunities/volunteer', [\App\Http\Controllers\VolunteerApplicationController::class, 'create'])->name('volunteer-opportunities');
Route::post('/opportunities/volunteer', [\App\Http\Controllers\VolunteerApplicationController::class, 'store'])->name('volunteer-applications.store');

Route::get('/opportunities/internship', [\App\Http\Controllers\InternshipApplicationController::class, 'create'])->name('internship-opportunities');
Route::post('/opportunities/internship', [\App\Http\Controllers\InternshipApplicationController::class, 'store'])->name('internship-applications.store');

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

Route::get('/working-areas/{slug}', function ($slug) {
    $workingArea = \App\Models\WorkingArea::where('slug', $slug)->where('is_active', true)->firstOrFail();
    $allWorkingAreas = \App\Models\WorkingArea::active()->ordered()->get(['id', 'title', 'slug']);
    
    return Inertia::render('workingAreas', [
        'workingArea' => [
            'title' => $workingArea->title,
            'description' => $workingArea->description,
            'image_url' => $workingArea->image_url,
        ],
        'allWorkingAreas' => $allWorkingAreas,
    ]);
})->name('working-areas.show');

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
    Route::get('/working-areas', function () {
        return \App\Models\WorkingArea::active()->ordered()->get(['id', 'title', 'slug']);
    });
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
    
    // Working Areas Management
    Route::resource('working-areas', \App\Http\Controllers\Admin\WorkingAreaController::class);
    
    // Volunteer Applications Management
    Route::get('/volunteer-applications', [\App\Http\Controllers\Admin\VolunteerApplicationAdminController::class, 'index'])->name('volunteer-applications.index');
    Route::get('/volunteer-applications/{application}', [\App\Http\Controllers\Admin\VolunteerApplicationAdminController::class, 'show'])->name('volunteer-applications.show');
    Route::patch('/volunteer-applications/{application}/status', [\App\Http\Controllers\Admin\VolunteerApplicationAdminController::class, 'updateStatus'])->name('volunteer-applications.update-status');
    Route::delete('/volunteer-applications/{application}', [\App\Http\Controllers\Admin\VolunteerApplicationAdminController::class, 'destroy'])->name('volunteer-applications.destroy');
    
    // Internship Applications Management
    Route::get('/internship-applications', [\App\Http\Controllers\Admin\InternshipApplicationAdminController::class, 'index'])->name('internship-applications.index');
    Route::get('/internship-applications/{application}', [\App\Http\Controllers\Admin\InternshipApplicationAdminController::class, 'show'])->name('internship-applications.show');
    Route::patch('/internship-applications/{application}/status', [\App\Http\Controllers\Admin\InternshipApplicationAdminController::class, 'updateStatus'])->name('internship-applications.update-status');
    Route::delete('/internship-applications/{application}', [\App\Http\Controllers\Admin\InternshipApplicationAdminController::class, 'destroy'])->name('internship-applications.destroy');
    
    // Voice of Changes - Admin routes
    Route::get('/voice-of-changes', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'index'])->name('voice-of-changes.index');
    Route::get('/voice-of-changes/{voiceOfChange}', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'show'])->name('voice-of-changes.show');
    Route::post('/voice-of-changes/{voiceOfChange}/approve', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'approve'])->name('voice-of-changes.approve');
    Route::post('/voice-of-changes/{voiceOfChange}/reject', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'reject'])->name('voice-of-changes.reject');
    Route::post('/voice-of-changes/{voiceOfChange}/unpublish', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'unpublish'])->name('voice-of-changes.unpublish');
    Route::delete('/voice-of-changes/{voiceOfChange}', [\App\Http\Controllers\Admin\VoiceOfChangeAdminController::class, 'destroy'])->name('voice-of-changes.destroy');
    
    // User Applications Management
    Route::get('/applications', [\App\Http\Controllers\Admin\UserApplicationAdminController::class, 'index'])->name('applications.index');
    Route::get('/applications/{application}', [\App\Http\Controllers\Admin\UserApplicationAdminController::class, 'show'])->name('applications.show');
    Route::post('/applications/{application}/approve', [\App\Http\Controllers\Admin\UserApplicationAdminController::class, 'approve'])->name('applications.approve');
    Route::post('/applications/{application}/reject', [\App\Http\Controllers\Admin\UserApplicationAdminController::class, 'reject'])->name('applications.reject');
    Route::delete('/applications/{application}', [\App\Http\Controllers\Admin\UserApplicationAdminController::class, 'destroy'])->name('applications.destroy');
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
