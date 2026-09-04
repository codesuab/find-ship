<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\Config\SmtpController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    // Guest
    Route::controller(AuthController::class)->middleware('adminGuest')->group(function () {
        Route::get('/login', 'index')->name('admin.login');
        Route::post('/login-post', 'login')->name('admin.login.post');
    });

    // Auth
    Route::middleware(['adminAuth', 'adminStatus'])->group(function () {
        // dashboard 
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

        // Admin
        Route::controller(AdminController::class)->group(function () {
            Route::get('/admin-list', 'index')->name('admin.admin.index');
            Route::post('/admin-store', 'store')->name('admin.admin.store');
            Route::delete('/admin-delete/{id}', 'destroy')->name('admin.admin.delete');
            Route::post('/admin-delete/bulk', 'destroyBuk')->name('admin.admin.delete.bulk');
        });

        // Customer 
        Route::controller(CustomerController::class)->group(function () {
            Route::get('/customer-list', 'index')->name('admin.customer.index');
            Route::post('/customer-store', 'store')->name('admin.customer.store');
            Route::delete('/customer-delete/{id}', 'destroy')->name('admin.customer.delete');
            Route::post('/customer-delete/bulk', 'destroyBuk')->name('admin.customer.delete.bulk');
        });

        // Config ===========
        Route::controller(SmtpController::class)->group(function () {
            Route::get('/smtp-index', 'index')->name('admin.smtp.index');
            Route::post('/smtp-store', 'store')->name('admin.smtp.store');
        });

        // Account
        Route::controller(AccountController::class)->group(function () {
            Route::get('/account-index', 'index')->name('admin.account.index');
            Route::post('/account-personal', 'personal')->name('admin.account.personal');
            Route::post('/account-security', 'security')->name('admin.account.security');
        });

        // logout
        Route::get('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    });
});
