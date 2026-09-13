<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\ApiCallLimit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    // index
    public function index()
    {
        $apiCall = ApiCallLimit::first();

        return Inertia::render('admin/config/setting', [
            'apiCall' => $apiCall
        ]);
    }

    // api rat limit
    public function apiCallLimit(Request $request)
    {
        $request->validate([
            'in_port' => 'required|numeric|gt:0',
            'expected' => 'required|numeric|gt:0',
            'departure' => 'required|numeric|gt:0',
            'arrival' => 'required|numeric|gt:0',
        ]);


        $id = $request->id;
        

        ApiCallLimit::updateOrCreate(['id' => $id], $request->except('id'));

        return back()->with('success', 'Updated success.')->with('_flash_id', time());
    }
}
