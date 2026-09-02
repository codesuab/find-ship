<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {

            $existing = Admin::where('email', $request->email)->first();
            if (!$existing) {
                return back()->with('error', "Invalid login information")->with('_flash_id', time());
            }

            if(!(bool) $existing->is_active){
                return back()->with('error', "This account currently inactive.")->with('_flash_id', time());
            }

            if (Auth::guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password
            ], true)) {
                $request->session()->regenerate();

                $existing->update([
                    'last_login_at' => now(),
                    'last_login_ip' => $request->ip(),
                ]);

                return redirect()->route('admin.dashboard');
            }

            return back()->with('error', "Invalid login information")->with('_flash_id', time());
        } catch (\Throwable $th) {
            return back()->with('error', "Something else wrong . try again!")->with('_flash_id', time());
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
