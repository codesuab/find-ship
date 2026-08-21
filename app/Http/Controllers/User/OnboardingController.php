<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    // index
    public function index()
    {
        $user = Auth::user();
        if($user && $user->oonboarding_completed){
            return to_route('app.dashboard');
        }

        return Inertia::render('app/onboarding/index');
    }
}
