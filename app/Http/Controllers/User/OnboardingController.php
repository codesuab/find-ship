<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    // index
    public function index()
    {
        $user = Auth::user();
        if ($user && $user->onboarding_completed == 1) {
            return to_route('app.dashboard');
        }

        $country = [
            ['label' => 'Select a country', 'value' => null],
            ['label' => 'Bangladesh', 'value' => 'bangladesh'],
            ['label' => 'China', 'value' => 'china'],
            ['label' => 'India', 'value' => 'india'],
        ];

        return Inertia::render('app/onboarding/index', [
            'userData' => $user,
            'country' => $country
        ]);
    }

    // personal
    public function personal(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|min:11|max:20',
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2024'],
            'gender' => 'required|in:male,female,other',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'zip' => 'required|string|max:20',
            'address' => 'required|string|min:5|max:500',
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail(Auth::id());

            $data = $request->only([
                'phone',
                'gender',
                'country',
                'city',
                'zip',
                'address',
            ]);

            if ($request->hasFile('avatar')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }

                $data['avatar'] = $request->file('avatar')->store('user/image', 'public');
            }

            $user->update($data);

            DB::commit();

            Cache::forget("auth:user:" . Auth::id());

            return back()
                ->with('success', 'Personal information updated success!')
                ->with('_flash_id', time());;
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()
                ->with('error', 'Something went wrong, try again!')
                ->with('_flash_id', time());
        }
    }

    // company
    public function company(Request $request)
    {
        $request->validate([
            'company_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2024'],
            'company_name' => 'required|string|max:255',
            'company_type' => 'required|string',
            'company_address' => 'required|string|min:5|max:500',
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail(Auth::id());

            $data = $request->only([
                'company_name',
                'company_logo',
                'company_type',
                'company_address',
            ]);

            if ($request->hasFile('company_logo')) {
                if ($user->company_logo) {
                    Storage::disk('public')->delete($user->company_logo);
                }

                $data['company_logo'] = $request->file('company_logo')->store('user/image', 'public');
            }

            $user->update($data);


            DB::commit();

            return back()
                ->with('success', 'Company information updated success!')
                ->with('_flash_id', time());;
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()
                ->with('error', 'Something went wrong, try again!')
                ->with('_flash_id', time());
        }
    }

    // final stage
    public function final()
    {
        DB::beginTransaction();
        try {
            $user = User::findOrFail(Auth::id());
            $data = [];
            $data['onboarding_completed'] = 1;

            $user->update($data);

            DB::commit();
            return to_route('app.dashboard');
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()
                ->with('error', 'Something went wrong, try again!')
                ->with('_flash_id', time());
        }
    }
}
