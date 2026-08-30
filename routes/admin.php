<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    // Guest
    Route::middleware('guest')->controller(AuthController::class)->group(function () {
        Route::get('/login', 'index')->name('amin.login');
    });

    // Auth
    Route::middleware('auth:admin')->group(function () {});
});
