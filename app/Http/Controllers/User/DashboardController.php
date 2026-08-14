<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('app/dashboard');
    }
}
