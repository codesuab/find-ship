<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Prot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PortController extends Controller
{
    // index
    public function index(Request $request)
    {
        $filter = $request->only('search', 'country_id');

        $data = Prot::filter($filter)
            ->latest()
            ->with('country')
            ->paginate(10)
            ->withQueryString();

        $country = Country::where('status', 'active')->get()
            ->map(function ($c) {
                return [
                    'label' => $c->name,
                    'value' => $c->id
                ];
            });


        return Inertia::render('admin/config/port', [
            'initData' => $data,
            'filter' => $filter,
            'country' => $country
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:countries,name,' . $request->id,
            'country_id' => 'required|exists:countries,id',
            'port_code' => "required|unique:prots,port_code," . $request->id,
            'status' => 'required|in:active,inactive'
        ]);

        Prot::updateOrCreate(['id' => $request->id], $request->except('id'));

        return back()->with('success', 'Port saved.')->with('_flash_id', time());
    }

    // delete single
    public function destroy($id)
    {
        $admin =  Prot::find($id);
        $admin->delete();

        return back()->with('success', 'Port delete success.')->with('_flash_id', time());
    }

    // delete bulk
    public function destroyBuk(Request $request)
    {
        DB::beginTransaction();
        try {
            $admins = Prot::whereIn('id', $request->ids)->get();

            foreach ($admins as $items) {
                $items->delete();
            }

            DB::commit();
            return back()->with('success', 'Selected port delete success.')->with('_flash_id', time());
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something else wrong,')->with('_flash_id', time());
        }
    }
}
