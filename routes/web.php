<?php

use App\Http\Controllers\Ui\AuthController;
use App\Http\Controllers\Ui\ContactController;
use App\Http\Controllers\Ui\SingleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get('/sing-up', 'singUp')->name('ui.sing.up');
});


Route::get('/test', function () {
    return Inertia::render('app/dashboard');
});
