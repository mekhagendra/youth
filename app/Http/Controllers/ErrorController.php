<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    public function notFound()
    {
        return Inertia::render('Errors/404');
    }

    public function forbidden()
    {
        return Inertia::render('Errors/403');
    }

    public function serverError()
    {
        return Inertia::render('Errors/500');
    }

    public function serviceUnavailable()
    {
        return Inertia::render('Errors/ErrorPage', [
            'status' => 503,
            'title' => 'Service Unavailable',
            'message' => 'We are currently performing maintenance. Please try again later.'
        ]);
    }
}