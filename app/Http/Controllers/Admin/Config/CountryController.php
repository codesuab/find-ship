<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CountryController extends Controller
{
    // index
    public function index(Request $request)
    {
        $filter = $request->only('search');

        $data = Country::filter($filter)
            ->latest()
            ->paginate(10)
            ->withQueryString();


        return Inertia::render('admin/config/country', [
            'initData' => $data,
            'filter' => $filter
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:countries,name,' . $request->id,
            'status' => 'required|in:active,inactive'
        ]);

        Country::updateOrCreate(['id' => $request->id], $request->except('id'));

        return back()->with('success', 'Country saved.')->with('_flash_id', time());
    }

     // delete single
    public function destroy($id)
    {
        $admin =  Country::find($id);
        $admin->delete();

        return back()->with('success', 'Country delete success.')->with('_flash_id', time());
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $admins = Country::whereIn('id', $request->ids)->get();

            foreach ($admins as $items) {
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected Country delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }
}
