<?php

use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->middleware(['auth', 'insSureEmailVerify'])->group(function () {
    // Onboarding
    Route::controller(OnboardingController::class)->group(function () {
        Route::get('/onboarding', 'index')->name('app.onboarding.index');
    });

    // final routes
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('app.dashboard');

    // account
    Route::controller(AccountController::class)->group(function () {
        Route::get('/account', 'index')->name('app.account.view');
    });
});
