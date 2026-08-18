<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Mail\GlobalMail;
use App\Models\EmailVerificationCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
                return back()->with('error', 'Invalid email or password')->with('_flash_id', time());
            }

            if ($user->status !== 'active') {
                return back()->with(
                    'error',
                    $user->status_message ?? 'Your account is not active.'
                )->with('_flash_id', time());
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
            return back()->with('error', 'Something went wrong. Please try again.')->with('_flash_id', time());
        }
    }

    // sing up
    public function singUp()
    {
        return Inertia::render('auth/SingUp');
    }

    public function singUpLogic(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => [
                'required',
                'email',
                'regex:/@(gmail|yahoo|outlook|icloud)\.(com|co\.uk|ca|au|de|fr|net)$/i',
            ],
            'password' => 'required|min:6',
        ], [
            'email.regex' => 'Only Gmail, Yahoo, Outlook, and iCloud email addresses are accepted.',
        ]);

        try {
            $existing = User::where('email', $request->email)->first();
            if ($existing) {
                return back()->with('error', 'This email address is already registered.')->with('_flash_id', time());
            }

            User::create([
                'name' => $request->name,
                'password' => Hash::make($request->password),
                'email' => $request->email,
            ]);

            if (Auth::attempt($request->only('email', 'password'), true)) {
                // create mail verification
                // delete old queue
                $queueKey = 'verification:'.Auth::id();
                DB::table('jobs')
                    ->where('payload', 'like', '%'.$queueKey.'%')
                    ->delete();

                $code = (string) random_int(100000, 999999);
                EmailVerificationCode::updateOrCreate(
                    ['email' => $request->email],
                    [
                        'code_hash' => Hash::make($code),
                        'expires_at' => now()->addMinutes(10),
                        'verified_at' => null,
                        'attempts' => 0,
                        'last_sent_at' => now(),
                    ]
                );
                $data = [
                    'otp' => $code,
                ];
                $view = 'mail.otp';
                $queueKey = 'verification:'.Auth::id();
                Mail::to($request->email)->queue(new GlobalMail('Email Verification', $data, $view, $queueKey));

                return to_route('ui.mail.verify')->with(
                    'success',
                    'A verification link has been sent to your email address. Please check your inbox and verify your email to continue.'
                )->with('_flash_id', time());
            }

            return to_route('login')->with(
                'success',
                'A verification link has been sent to your email address. Please check your inbox and verify your email to continue.'
            )->with('_flash_id', time());
        } catch (\Throwable $th) {
            return back()->with('error', 'Something else wrong try again!')->with('_flash_id', time());
        }
    }

    // mail verify
    public function mailVerify()
    {
        if (Auth::user()->email_verified_at) {
            return to_route('app.dashboard');
        }

        return Inertia::render('auth/mail');
    }

    public function verifyLogic(Request $request)
    {
        $request->validate([
            'otp' => 'required|min:6|max:6',
        ]);

        try {
            $user = Auth::user();

            $verification = EmailVerificationCode::where('email', $user->email)->first();

            if (! $verification) {
                return back()->with('error', 'Verification code not found.')->with('_flash_id', time());
            }

            if ($verification->expires_at->isPast()) {
                return back()->with('error', 'Verification code has expired.')->with('_flash_id', time());
            }

            if ($verification->attempts >= 5) {
                return back()->with('error', 'Too many attempts. Please request a new code.')->with('_flash_id', time());
            }

            if (! Hash::check($request->otp, $verification->code_hash)) {
                $verification->increment('attempts');

                return back()
                    ->with('error', 'Invalid verification code.')
                    ->with('_flash_id', time());
            }

            $verification->update([
                'verified_at' => now(),
            ]);

            $user->update([
                'email_verified_at' => now(),
            ]);

            $verification->delete();

            return to_route('app.dashboard');
        } catch (\Exception $th) {
            return back()->with('error', 'Something else wrong, try again!')->with('_flash_id', time());
        }
    }

    public function resendLogic()
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return back()->with('error', 'Something else wrong, try again!')->with('_flash_id', time());
            }

            EmailVerificationCode::where('email', $user->email)->delete();

            // delete old queue
            $queueKey = 'verification:'.$user->id;
            DB::table('jobs')
                ->where('payload', 'like', '%'.$queueKey.'%')
                ->delete();

            // send code
            $code = (string) random_int(100000, 999999);
            EmailVerificationCode::updateOrCreate(
                ['email' => $user->email],
                [
                    'code_hash' => Hash::make($code),
                    'expires_at' => now()->addMinutes(10),
                    'verified_at' => null,
                    'attempts' => 0,
                    'last_sent_at' => now(),
                ]
            );
            $data = [
                'otp' => $code,
            ];
            $view = 'mail.otp';
            $queueKey = 'verification:'.$user->id;
            Mail::to($user->email)->queue(new GlobalMail('Email Verification', $data, $view, $queueKey));

            return to_route('ui.mail.verify')->with(
                'success',
                'A verification link has been sent to your email address. Please check your inbox and verify your email to continue.'
            )->with('_flash_id', time());
        } catch (\Throwable $th) {
            return back()->with('error', 'Something else wrong, try again!')->with('_flash_id', time());
        }
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
