<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MemberController;

/*
|--------------------------------------------------------------------------
| PUBLIC / GUEST ROUTES
|--------------------------------------------------------------------------
*/

// User self-signup as member
Route::post('/members/signup', [MemberController::class, 'signup']);

// Public view of a member profile (with hidden phone/email if disabled)
Route::get('/members/public/{membership_id}', [MemberController::class, 'showPublic']);

// Member profile update (you should protect this with auth in real app)
Route::put('/members/{member}/profile', [MemberController::class, 'updateProfile']);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
| Protect these with proper middleware in your real app, e.g.:
| Route::middleware(['auth:sanctum', 'can:manage-members'])->group(...)
*/
Route::middleware([])->prefix('admin')->group(function () {
    Route::get('/members', [MemberController::class, 'index']);
    Route::post('/members', [MemberController::class, 'adminStore']);
    Route::get('/members/{membership_id}', [MemberController::class, 'showAdmin']);
    Route::delete('/members/{member}', [MemberController::class, 'destroy']);
});
