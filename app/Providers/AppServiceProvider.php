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
        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinute(5)
                    ->by('ip:'.$request->ip()),

                Limit::perMinute(3)
                    ->by('email:'.strtolower(trim($request->input('email', '')))),
            ];
        });

        RateLimiter::for('register', function (Request $request) {
            return Limit::perMinutes(10, 5)
                ->by('ip:'.$request->ip());
        });

        RateLimiter::for('verify-email', function (Request $request) {
            return [
                Limit::perMinutes(10, 5)
                    ->by('user:'.$request->user()->id),

                Limit::perMinutes(10, 20)
                    ->by('ip:'.$request->ip()),
            ];
        });

        RateLimiter::for('resend-verification', function (Request $request) {
            return [
                Limit::perMinutes(10, 2)
                    ->by('user:'.$request->user()->id),

                Limit::perMinutes(10, 10)
                    ->by('ip:'.$request->ip()),
            ];
        });
    }
}
