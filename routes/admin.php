<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\Config\CountryController;
use App\Http\Controllers\Admin\Config\DataDocController;
use App\Http\Controllers\Admin\Config\FrontendController;
use App\Http\Controllers\Admin\Config\PortController;
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
            Route::post('/admin-store', 'store')->name('admin.admin.store')->middleware('permission:admin.create,admin.update');
            Route::delete('/admin-delete/{id}', 'destroy')->name('admin.admin.delete')->middleware('permission:admins.delete');
            Route::post('/admin-delete/bulk', 'destroyBuk')->name('admin.admin.delete.bulk')->middleware('permission:admins.delete');
        });

        // Customer 
        Route::controller(CustomerController::class)->group(function () {
            Route::get('/customer-list', 'index')->name('admin.customer.index')->middleware('permission:customers.view');
            Route::post('/customer-store', 'store')->name('admin.customer.store')->middleware('permission:customers.create,customers.update');
            Route::delete('/customer-delete/{id}', 'destroy')->name('admin.customer.delete')->middleware('permission:customers.delete');
            Route::post('/customer-delete/bulk', 'destroyBuk')->name('admin.customer.delete.bulk')->middleware('permission:customers.delete');
        });

        // Config ===========
        Route::controller(SmtpController::class)->group(function () {
            Route::get('/smtp-index', 'index')->name('admin.smtp.index')->middleware('permission:smtp.view');
            Route::post('/smtp-store', 'store')->name('admin.smtp.store')->middleware('permission:smtp.update');
        });

        // DataDoc
        Route::controller(DataDocController::class)->group(function () {
            Route::get('/data-doc-index', 'index')->name('admin.datadoc.index')->middleware('permission:api.view');
            Route::post('/data-doc-store', 'store')->name('admin.datadoc.post')->middleware('permission:api.update,api.create');
            Route::delete('/data-doc-delete/{id}', 'destroy')->name('admin.datadoc.delete')->middleware('permission:api.delete');
            Route::post('/data-doc-delete/bulk', 'destroyBuk')->name('admin.datadoc.delete.bulk')->middleware('permission:api.delete');

            Route::get('/data-doc-balance/{id}', 'checkBalance')->name('admin.datadoc.balance');
        });

        // Role
        Route::controller(RoleController::class)->group(function () {
            Route::get('/role-list', 'index')->name('admin.role.index')->middleware('permission:roles.view');
            Route::post('/role-store', 'store')->name('admin.role.store')->middleware('permission:roles.update,roles.create');
            Route::delete('/role-delete/{id}', 'destroy')->name('admin.role.delete')->middleware('permission:roles.delete');
            Route::post('/role-delete/bulk', 'destroyBuk')->name('admin.role.delete.bulk')->middleware('permission:roles.delete');
        });

        // Account
        Route::controller(AccountController::class)->group(function () {
            Route::get('/account-index', 'index')->name('admin.account.index');
            Route::post('/account-personal', 'personal')->name('admin.account.personal');
            Route::post('/account-security', 'security')->name('admin.account.security');
        });

        // Frontend
        Route::controller(FrontendController::class)->group(function () {
            Route::get('/frontend-index', 'index')->name('admin.frontend.index')->middleware('permission:ui.view');

            Route::post('/frontend-faq/store', 'faqStore')->name('admin.frontend.faq.store')->middleware('permission:ui.create,ui.update');
            Route::delete('/frontend-faq/del/{id}', 'faqDelete')->name('admin.frontend.faq.delete')->middleware('permission:ui.delete');
        });

        // Country
        Route::controller(CountryController::class)->group(function () {
            Route::get('/country-index', 'index')->name('admin.country.index')->middleware('permission:country.view');
            Route::post('/country-store', 'store')->name('admin.country.store')->middleware('permission:country.create,country.update');
            Route::delete('/country-delete/{id}', 'destroy')->name('admin.country.delete')->middleware('permission:country.delete');
            Route::post('/country-delete/bulk', 'destroyBuk')->name('admin.country.delete.bulk')->middleware('permission:country.delete');
        });

        // Port
        Route::controller(PortController::class)->group(function () {
            Route::get('/port-index', 'index')->name('admin.port.index')->middleware('permission:port.view');
            Route::post('/port-store', 'store')->name('admin.port.store')->middleware('permission:port.create,port.update');
            Route::delete('/port-delete/{id}', 'destroy')->name('admin.port.delete')->middleware('permission:port.delete');
            Route::post('/port-delete/bulk', 'destroyBuk')->name('admin.port.delete.bulk')->middleware('permission:port.delete');
        });

        // logout
        Route::get('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    });
});
