<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = User::filter($request->only('search'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/customer', [
            'data' => $data,
            'filter' => $request->only('search')
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->id,
            'phone' => 'required|unique:users,phone,' . $request->id,
            'password' => 'nullable',
            'balance' => 'nullable|numeric',
            'status' => 'required|in:active,suspend,pending',
            'status_message' => 'nullable'
        ]);

        DB::beginTransaction();
        try {
            $data = $request->except('id', 'password');
            if ($request->has('password') && !empty($request->password)) {
                $data['password'] = Hash::make($request->password);
            }

            User::updateOrCreate(['id' => $request->id], $data);

            DB::commit();
            return back()->with('success', 'Customer saved success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong.' . $th->getMessage())->with('_flash_id', time());
        }
    }

    // delete single
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $user =  User::find($id);

            // delete profile
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // company logo
            if ($user->company_logo) {
                Storage::disk('public')->delete($user->company_logo);
            }

            $user->delete();
            DB::commit();
            return back()->with('success', 'Customer delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $users = User::whereIn('id', $request->ids)->get();

            foreach ($users as $items) {
                if ($items['avatar']) {
                    Storage::disk('public')->delete($items['avatar']);
                }
                if ($items['company_logo']) {
                    Storage::disk('public')->delete($items['company_logo']);
                }
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected Users delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,' . $th->getMessage())->with('_flash_id', time());
        }
    }
}
