<?php

use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->middleware(['auth', 'insSureEmailVerify'])->group(function () {
    // Onboarding
    Route::controller(OnboardingController::class)->group(function () {
        Route::get('/onboarding', 'index')->name('app.onboarding.index');
        Route::post('/onboarding-personal', 'personal')->name('app.onboarding.personal');
        Route::post('/onboarding-company', 'company')->name('app.onboarding.company');
        Route::post('/onboarding-final', 'final')->name('app.onboarding.final');
    });

    // final routes
    Route::middleware('insOnboarding')->group(function () {
        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('app.dashboard');

        // account
        Route::controller(AccountController::class)->group(function () {
            Route::get('/account', 'index')->name('app.account.view');
            Route::post('/account-personal', 'personal')->name('app.account.personal');
            Route::post('/account-security', 'security')->name('app.account.security');
            Route::post('/account-company', 'company')->name('app.account.company');
            Route::post('/account-danger', 'danger')->name('app.account.danger');
        });
    });
});
