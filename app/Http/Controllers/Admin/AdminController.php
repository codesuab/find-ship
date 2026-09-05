<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Admin::filter($request->only('search'))
            ->latest()
            ->with('role')
            ->paginate(10)
            ->withQueryString();

        $roles = Role::latest()->get();

        return Inertia::render('admin/users/admin', [
            'data' => $data,
            'roles' => $roles,
            'filter' => $request->only('search')
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:admins,email,' . $request->id,
            'password' => 'nullable|required_if:id,null|min:6',
            'is_active' => 'required|boolean',
            'role_id' => 'nullable'
        ]);
        try {
            $data = $request->except('id', 'password', 'role_id');

            if ((int)$request->input('role_id') == 0) {
                $data['role_id'] = null;
            } else {
                $data['role_id'] = $request->role_id;
            }

            if ($request->has('password') && !empty($request->password)) {
                $data['password'] = Hash::make($request->password);
            }

            Admin::updateOrInsert(['id' => $request->id], $data);

            if ($request->has('id')) {
                Cache::forget("auth:admin:{$request->id}");
            }

            return back()->with('success', 'Admin saved success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            return back()->with('error', 'Something else wrong, try again!')->with('_flash_id', time());
        }
    }

    // delete single
    public function destroy($id)
    {
        $admin =  Admin::find($id);

        // delete profile
        if ($admin->avatar) {
            Storage::disk('public')->delete($admin->avatar);
        }

        $admin->delete();
        return back()->with('success', 'Admin delete success.')->with('_flash_id', time());
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $admins = Admin::whereIn('id', $request->ids)->get();

            foreach ($admins as $items) {
                if ($items['avatar']) {
                    Storage::disk('public')->delete($items['avatar']);
                }
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected Admin delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }
}
