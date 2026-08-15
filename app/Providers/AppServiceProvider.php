<?php

namespace App\Providers;

use App\Models\SmtpConfig;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
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
        $this->configureDefaults();
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

        // config smt from database
        // $smtp = SmtpConfig::first(); // for live
        $smtp = SmtpConfig::find(2);
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
}
