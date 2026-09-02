<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    // Guest
    Route::controller(AuthController::class)->middleware('adminGuest')->group(function () {
        Route::get('/login', 'index')->name('admin.login');
        Route::post('/login-post', 'login')->name('admin.login.post');
    });

    // Auth
    Route::middleware('adminAuth')->group(function () {
        // dashboard 
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

        // Admin
        Route::controller(AdminController::class)->group(function () {
            Route::get('/admin-list', 'index')->name('admin.admin.index');
        });

        // logout
        Route::get('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    });
});
