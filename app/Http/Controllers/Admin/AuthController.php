<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('admin/login');
    }


    // public function login(Request $request)
    // {

    //     if (Auth::guard('admin')->attempt([
    //         'email' => $request->email,
    //         'password' => $request->password,
    //         'is_active' => true,
    //     ])) {
    //         $request->session()->regenerate();

    //         return redirect()->route('admin.dashboard');
    //     }
    // }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
