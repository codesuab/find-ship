<?php

use App\Http\Controllers\User\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->middleware('auth')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('app.dashboard');
});
