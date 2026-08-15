<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    // index
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('app/account', [
            'user' => $user,
        ]);
    }
}
