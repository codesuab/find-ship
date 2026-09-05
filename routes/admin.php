<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\Config\RoleController;
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
            Route::get('/admin-list', 'index')->name('admin.admin.index')->middleware('permission:admins.view');
            Route::post('/admin-store', 'store')->name('admin.admin.store')->middleware('permission:admin.create,update');
            Route::delete('/admin-delete/{id}', 'destroy')->name('admin.admin.delete')->middleware('permission:admins.delete');
            Route::post('/admin-delete/bulk', 'destroyBuk')->name('admin.admin.delete.bulk')->middleware('permission:admins.delete');
        });

        // Customer 
        Route::controller(CustomerController::class)->group(function () {
            Route::get('/customer-list', 'index')->name('admin.customer.index')->middleware('permission:customers.view');
            Route::post('/customer-store', 'store')->name('admin.customer.store')->middleware('permission:customers.create,update');
            Route::delete('/customer-delete/{id}', 'destroy')->name('admin.customer.delete')->middleware('permission:customers.delete');
            Route::post('/customer-delete/bulk', 'destroyBuk')->name('admin.customer.delete.bulk')->middleware('permission:customers.delete');
        });

        // Config ===========
        Route::controller(SmtpController::class)->group(function () {
            Route::get('/smtp-index', 'index')->name('admin.smtp.index')->middleware('permission:smtp.view');
            Route::post('/smtp-store', 'store')->name('admin.smtp.store')->middleware('permission:smtp.update');
        });

        // Role
        Route::controller(RoleController::class)->group(function () {
            Route::get('/role-list', 'index')->name('admin.role.index')->middleware('permission:roles.view');
            Route::post('/role-store', 'store')->name('admin.role.store')->middleware('permission:roles.update,create');
            Route::delete('/role-delete/{id}', 'destroy')->name('admin.role.delete')->middleware('permission:roles.delete');
            Route::post('/role-delete/bulk', 'destroyBuk')->name('admin.role.delete.bulk')->middleware('permission:roles.delete');
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
