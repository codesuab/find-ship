<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoleController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Role::filter($request->only('search'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/config/role', [
            'data' => $data,
            'filter' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $request->id,
            'slug' => 'required|unique:roles,slug,' . $request->id,
        ]);

        DB::beginTransaction();
        try {
            Role::updateOrCreate(['id' => $request->id], $request->except('id'));

            $adminId = Auth::guard('admin')->id();
            Cache::forget("auth:admin:{$adminId}");

            DB::commit();
            return back()->with('success', 'Role saved success')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong, try again!')->with('_flash_id', time());
        }
    }

    // delete single
    public function destroy($id)
    {
        $admin =  Role::find($id);

        $admin->delete();
        return back()->with('success', 'Role delete success.')->with('_flash_id', time());
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $admins = Role::whereIn('id', $request->ids)->get();

            foreach ($admins as $items) {
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected Roles delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }
}
