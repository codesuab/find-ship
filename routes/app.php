<?php

use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\User\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->middleware(['auth', 'insSureEmailVerify'])->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('app.dashboard');

    // account
    Route::controller(AccountController::class)->group(function () {
        Route::get('/account', 'index')->name('app.account.view');
    });
});
