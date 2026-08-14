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
    Route::get('/login', 'login')->name('login');
    Route::post('/login-post', 'loginLogic')->name('login.post');
    Route::get('/sing-up', 'singUp')->name('ui.sing.up');

    // social login
    Route::get('/social/redirect/{type}', 'authRedirect')->name('ui.social.redirect');
    Route::get('/social/callback/{type}', 'authCallback')->name('ui.social.callback');
});
Route::middleware('auth')->prefix('/auth')->controller(AuthController::class)->group(function () {
    Route::get('/logout', 'logout')->name('logout');
});

// extra routes
require __DIR__.'/app.php';
