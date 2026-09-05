<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(
        Request $request,
        Closure $next,
        string $permission
    ): Response {
        $admin = Auth::guard('admin')->user();

        abort_unless(
            $admin &&
                (
                    $admin->role?->permissions === null ||
                    $admin->hasPermission($permission)
                ),
            403
        );

        return $next($request);
    }
}
