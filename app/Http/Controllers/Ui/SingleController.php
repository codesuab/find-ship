<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SingleController extends Controller
{
    // home
    public function home()
    {
        return Inertia::render('home');
    }

    // About us
    public function about()
    {
        return Inertia::render('about');
    }
}
