<?php

use App\Http\Controllers\Ui\AuthController;
use App\Http\Controllers\Ui\ContactController;
use App\Http\Controllers\Ui\SingleController;
use Illuminate\Support\Facades\Route;

// Ui ===============================
Route::controller(SingleController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about-us', 'about')->name('ui.about');
});
Route::controller(ContactController::class)->group(function () {
    Route::get('/contact-us', 'index')->name('ux.contact.index');
});

// Auth ============
Route::middleware('guest')->prefix('/auth')->controller(AuthController::class)->group(function () {
    // for login
    Route::get('/', 'login')->name('login');
    Route::post('/login-post', 'loginLogic')
        ->name('login.post');

    // for signup
    Route::get('/sing-up', 'singUp')->name('ui.sing.up');
    Route::post('/sing-up-post', 'singUpLogic')
        ->name('ui.sing.up.post');

    // for forgat
    Route::get('/forgat', 'forgat')->name('ui.forgat');
    Route::post('/forgat-send', 'forgatLogic')->name('ui.forgat.login');

    // reset password
    Route::get('/reset-password/{email}/{token}', 'resetPassword')->name('ui.reset.password');
    Route::post('/reset-password-post', 'updateResetpassword')->name('ui.reset.password.post');

    // social login
    Route::get('/social/redirect/{type}', 'authRedirect')->name('ui.social.redirect');
    Route::get('/social/callback/{type}', 'authCallback')->name('ui.social.callback');
});
Route::middleware('auth')->prefix('/auth')->controller(AuthController::class)->group(function () {
    Route::get('/mail-verify', 'mailVerify')->name('ui.mail.verify');
    Route::post('/mail-verify-logic', 'verifyLogic')
        ->name('ui.mail.verify.logic');
    Route::post('/mail-verify-resend', 'resendLogic')
        ->name('ui.mail.verify.resend');

    Route::get('/logout', 'logout')->name('logout');
});

// extra routes
require __DIR__ . '/app.php';
require __DIR__ . '/admin.php';
