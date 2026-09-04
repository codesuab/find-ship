<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CustomerStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user?->status === 'suspend') {
            return response()->view('errors.600', [
                'message' => $user->status_message,
                'date' => $user->updated_at->format('d M, Y')
            ], 403);
        }
        return $next($request);
    }
}
