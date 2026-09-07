<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\DatadockedApiConfigure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DataDocController extends Controller
{
    // index
    public function index(Request $request)
    {
        $filter = $request->only('search');
        $data = DatadockedApiConfigure::filter($filter)
            ->latest()
            ->paginate(20)
            ->withQueryString();


        $totalToken = DatadockedApiConfigure::sum('token');
        $totalApi = DatadockedApiConfigure::count();
        $currentActive = DatadockedApiConfigure::where('status', 'active')->select('label', 'token')->first();

        return Inertia::render('admin/config/dataDoc', [
            'initData' => $data,
            'totalToken' => $totalToken,
            'filter' => $filter,
            'totalApi' => $totalApi,
            'currentActive' => $currentActive
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required',
            'uri' => "required|url",
            'key' => 'required',
            'token' => 'nullable|numeric',
            'status' => 'required'
        ]);

        if ($request->input('status') == 'active') {
            DatadockedApiConfigure::where('status', 'active')->update(['status' => 'inactive']);
        }

        DatadockedApiConfigure::updateOrCreate(['id' => $request->id], $request->except('id'));

        return back()->with('success', 'Saved Success')->with('_flash_id', time());
    }

    // delete single
    public function destroy($id)
    {
        $admin =  DatadockedApiConfigure::find($id);
        $admin->delete();

        return back()->with('success', 'Api delete success.')->with('_flash_id', time());
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $admins = DatadockedApiConfigure::whereIn('id', $request->ids)->get();

            foreach ($admins as $items) {
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected Api delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }
}
