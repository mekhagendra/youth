<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/activities', function () {
    return Inertia::render('activities');
})->name('activities');

Route::get('/activities/{id}', function ($id) {
    return Inertia::render('activity-detail', [
        'activityId' => $id
    ]);
})->name('activity-detail');

Route::get('/gallery', function () {
    return Inertia::render('gallery');
})->name('gallery');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
