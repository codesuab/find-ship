<?php

namespace App\Providers;

use App\Models\SmtpConfig;
use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->rateLimit();
        $this->configureDefaults();
        $this->configureSmtp();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    // mail config
    protected function configureSmtp(): void
    {
        // config smt from database
        $smtp = SmtpConfig::first();
        if ($smtp) {
            $config = [
                'driver' => $smtp->driver,
                'host' => $smtp->host,
                'port' => $smtp->port,
                'username' => $smtp->username,
                'password' => $smtp->password,
                'encryption' => $smtp->encryption,
                'from' => [
                    'address' => $smtp->from_address,
                    'name' => $smtp->from_name,
                ],
            ];
            Config::set('mail', $config);
        }
    }

    // rate limit
    protected function rateLimit(): void
    {
        // for resend account verification email
        RateLimiter::for('reset-verification-email', function (Request $request) {
            $key = 'reset-verification-email:'.$request->email;

            return Limit::perMinutes(10, 2) // Per 10 minutes 2 Request
                ->by($key)
                ->response(function (Request $request, array $headers) {
                    $retryAfter = $headers['Retry-After'] ?? 600; // 10 minutes = 600 seconds
                    $minutes = ceil($retryAfter / 60);

                    return back()->withErrors([
                        'email' => "Too many verification attempts. Please wait {$minutes} minutes.",
                    ])->withInput();
                });
        });
    }
}
