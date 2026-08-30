<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Socialite\Socialite;

class AccountController extends Controller
{
    // index
    public function index(Request $request)
    {
        $user = Auth::user();

        $country = [
            ['label' => 'Select a country', 'value' => null],
            ['label' => 'Bangladesh', 'value' => 'bangladesh'],
            ['label' => 'China', 'value' => 'china'],
            ['label' => 'India', 'value' => 'india'],
        ];

        return Inertia::render('app/account', [
            'user' => $user,
            'country' => $country,
            'tab' => $request->query('tab')
        ]);
    }

    // personal
    public function personal(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . Auth::id(),
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
                'name',
                'email',
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

    // security
    public function security(Request $request)
    {
        $request->validate([
            'new_password' => 'required|string|min:8',
            'confirmed_password' => 'required|same:new_password',
        ]);

        $user = $request->user();

        if ($request->has('new_password')) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
        }

        return back()->with('success', 'Password updated successfully.')->with('_flash_id', time());;
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

    // danger
    public function danger(Request $request)
    {
        $request->validate([
            'password' => 'required'
        ]);

        DB::beginTransaction();
        try {
            $user = User::find(Auth::id());

            if (!Hash::check($request->password, $user->password)) {
                DB::rollBack();
                return back()
                    ->with('error', 'The password is incorrect.')
                    ->with('_flash_id', time());
            }

            // delete profile
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Delete logo
            if ($user->company_logo) {
                Storage::disk('public')->delete($user->company_logo);
            }

            Auth::logout();
            $request->session()->invalidate();

            $user->delete();

            DB::commit();
            return redirect()
                ->route('login')
                ->with('success', 'Your account has been permanently deleted.')->with('_flash_id', time());;
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()
                ->with('error', 'Something went wrong, try again!')
                ->with('_flash_id', time());
        }
    }

    // social
    public function connectRedirect($type)
    {
        return Socialite::driver($type)
            ->redirectUrl(route('app.account.connect.callback', [
                'type' => $type,
            ]))
            ->redirect();
    }

    public function connectCallback($type, Request $request)
    {
        $socialUser = Socialite::driver($type)
            ->redirectUrl(route('app.account.connect.callback', [
                'type' => $type,
            ]))
            ->user();


        // check already uses or not
        $existing = false;
        if ($type == 'google') {

            $existing = User::where('google_id', $socialUser->id)->exists();
        } elseif ($type == 'facebook') {
            $existing = User::where('facebook_id', $socialUser->id)->exists();
        }
        if ($existing) {
            return to_route('app.account.view', ['tab' => 'connect'])
                ->with('error', 'This account is already connected to another account.')
                ->with('_flash_id', time());
        }

        $user = $request->user();

        $user->update([
            "{$type}_id" => $socialUser->getId(),
        ]);

        return to_route('app.account.view', ['tab' => 'connect'])->with('success', ucfirst($type) . ' account connected successfully.')->with('_flash_id', time());;
    }

    // remove social 
    public function removeSocial($type)
    {
        $user = User::find(Auth::id());

        if ($type == 'google') {
            $user->google_id = null;
            $user->google_token = null;
            $user->google_refresh_token = null;
        }

        if ($type == 'facebook') {
            $user->facebook_id = null;
            $user->facebook_token = null;
            $user->facebook_refresh_token = null;
        }

        $user->save();

        return to_route('app.account.view', ['tab' => 'account'])->with('success', 'Account disconnected success.')->with('_flash_id', time());
    }
}
