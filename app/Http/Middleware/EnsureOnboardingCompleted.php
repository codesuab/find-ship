<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (
            $user &&
            !$user->onboarding_completed &&
            !$request->routeIs('onboarding.*')
        ) {
             return Inertia::location(route('app.onboarding.index'));
        }

        return $next($request);
    }
}
