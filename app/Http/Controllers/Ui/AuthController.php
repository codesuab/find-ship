<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Laravel\Socialite\Socialite;

class AuthController extends Controller
{
    // login
    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function loginLogic(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        try {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return back()->with('error', 'Invalid email or password');
            }

            if ($user->status !== 'active') {
                return back()->with(
                    'error',
                    $user->status_message ?? 'Your account is not active.'
                );
            }

            // Logout all old devices/sessions
            DB::table('sessions')
                ->where('user_id', $user->id)
                ->delete();

            $deviceId = hash('sha256', $request->userAgent());

            $user->update([
                'login_device_id' => $deviceId,
                'login_device_name' => $request->userAgent(),
                'login_browser' => $request->header('sec-ch-ua'),
                'login_os' => $request->header('sec-ch-ua-platform'),
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            Auth::login($user, $request->boolean('remember'));

            $request->session()->regenerate();

            return to_route('app.dashboard');
        } catch (\Throwable $e) {
            return back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    // sing up
    public function singUp()
    {
        return Inertia::render('auth/SingUp');
    }

    // social
    public function authRedirect($type)
    {
        return Socialite::driver($type)->redirect();
    }

    public function authCallback($type, Request $request)
    {
        $socialUser = Socialite::driver($type)->user();

        $providerId = $socialUser->id;
        $email = $socialUser->email;

        $field = $type === 'google' ? 'google_id' : 'facebook_id';

        $tokenField = $type === 'google'
            ? 'google_token'
            : 'facebook_token';

        $refreshTokenField = $type === 'google'
            ? 'google_refresh_token'
            : 'facebook_refresh_token';

        $deviceId = hash('sha256', $request->userAgent());

        $user = User::where($field, $providerId)->first();

        if (! $user && $email) {
            $user = User::where('email', $email)->first();
        }

        $data = [
            $field => $providerId,
            $tokenField => $socialUser->token,
            $refreshTokenField => $socialUser->refreshToken,
            'login_device_id' => $deviceId,
            'login_device_name' => $request->userAgent(),
            'login_browser' => $request->header('sec-ch-ua'),
            'login_os' => $request->header('sec-ch-ua-platform'),
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
            'email_verified_at' => now(),
        ];

        if ($user) {
            $user->update($data);
        } else {
            $user = User::create([
                'name' => $socialUser->name,
                'email' => $email,
                'avatar' => $socialUser->avatar,
                ...$data,
            ]);
        }

        // Logout all previous devices
        DB::table('sessions')
            ->where('user_id', $user->id)
            ->delete();

        Auth::login($user);

        $request->session()->regenerate();

        return to_route('app.dashboard');
    }

    // logout
    public function logout()
    {
        $user = User::findOrFail(Auth::id());
        if ($user) {
            $user->update([
                'login_device_id' => null,
                'login_device_name' => null,
                'login_browser' => null,
                'login_os' => null,
            ]);
        }

        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return to_route('login');
    }
}
