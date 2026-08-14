<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    //login
    public function login()
    {
        return Inertia::render('auth/login');
    }

    // sing up
    public function singUp()
    {
        return Inertia::render('auth/SingUp');
    }
}
