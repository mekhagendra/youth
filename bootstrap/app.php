<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Not Found'], 404);
            }
            
            return \Inertia\Inertia::render('Errors/404')->toResponse($request)->setStatusCode(404);
        });

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Forbidden'], 403);
            }
            
            return \Inertia\Inertia::render('Errors/403')->toResponse($request)->setStatusCode(403);
        });

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Service Unavailable'], 503);
            }
            
            return \Inertia\Inertia::render('Errors/503')->toResponse($request)->setStatusCode(503);
        });

        $exceptions->render(function (\Throwable $e, $request) {
            if (app()->environment('production') && !$request->expectsJson()) {
                // Handle HTTP exceptions
                if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                    $statusCode = $e->getStatusCode();
                    if ($statusCode >= 500) {
                        return \Inertia\Inertia::render('Errors/500')->toResponse($request)->setStatusCode($statusCode);
                    }
                } else {
                    // Handle general exceptions as 500 errors in production
                    return \Inertia\Inertia::render('Errors/500')->toResponse($request)->setStatusCode(500);
                }
            }
        });
    })->create();
