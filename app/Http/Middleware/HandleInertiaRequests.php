<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => fn() => $request->user()
                    ? Cache::remember(
                        "auth:user:{$request->user()->id}",
                        now()->addMinutes(10),
                        fn() => $request->user()->only([
                            'id',
                            'name',
                            'email',
                            'avatar',
                            'company_name',
                            'company_logo',
                            'avatar'
                        ])
                    )
                    : null,
                'admin' => function () {
                    if (!request()->is('admin*')) {
                        return null;
                    }

                    $admin = Auth::guard('admin')->user();

                    if (!$admin) {
                        return null;
                    }

                    return Cache::remember(
                        "auth:admin:{$admin->id}",
                        now()->addMinutes(10),
                        fn() => [
                            ...$admin->only([
                                'id',
                                'name',
                                'email',
                                'avatar',
                            ]),
                            'role' => $admin->role?->only([
                                'id',
                                'name',
                                'slug',
                            ]),
                            'permissions' => $admin->role?->permissions ?? [],
                        ]
                    );
                },
            ],
            'current_route' => Route::currentRouteName(),
            'flash' => [
                'error' => fn() => $request->session()->get('error'),
                'success' => fn() => $request->session()->get('success'),
                'custom' => fn() => $request->session()->get('custom'),
                'id' => fn() => $request->session()->get('_flash_id'),
                'retry_after' => fn() => $request->session()->get('retry_after'),
            ],
        ];
    }
}
