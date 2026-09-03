<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AccountController extends Controller
{
    // index
    public function index()
    {
        $userId = Auth::guard('admin')->user()->id;

        $data = Cache::remember(
            "account:admin-data:{$userId}",
            now()->addMinutes(10),
            fn() => Admin::find($userId)?->toArray()
        );

        return Inertia::render('admin/account', [
            'data' => $data
        ]);
    }

    // personal
    public function personal(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2024'],
        ]);

        DB::beginTransaction();

        try {
            $user = Admin::findOrFail(Auth::guard('admin')->id());

            $data = $request->only([
                'name',
                'email',
            ]);

            if ($request->hasFile('avatar')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }

                $data['avatar'] = $request->file('avatar')->store('user/image', 'public');
            }

            $user->update($data);

            DB::commit();

            Cache::forget("account:admin-data:" . Auth::guard('admin')->id());
            Cache::forget("auth:admin:" . Auth::guard('admin')->id());

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

        $user = Admin::find(Auth::guard('admin')->id());

        if ($request->has('new_password')) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
        }

        return back()->with('success', 'Password updated successfully.')->with('_flash_id', time());;
    }
}
