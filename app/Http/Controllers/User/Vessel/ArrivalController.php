<?php

namespace App\Http\Controllers\User\Vessel;

use App\Classes\DataDocClass;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\PortCall;
use App\Models\Prot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArrivalController extends Controller
{
    // index
    public function index(Request $request)
    {

        $country = Country::where('status', 'active')->get()
            ->map(function ($c) {
                return [
                    'label' => $c->name,
                    'value' => $c->id
                ];
            });

        $ports = Prot::where('status', 'active')->get()
            ->map(function ($p) {
                return [
                    'label' => $p->name,
                    'value' => $p->id,
                    'country_id' => $p->country_id
                ];
            });

        $vesselType = [
            'All Type',
            'Bulk Carrier',
            'General Cargo',
            'Container',
            'Reefer',
            'Ro-Ro',
            'Vehicles Carrier',
            'Cement Carrier',
            'Wood Chips Carrier',
            'Urea Carrier',
            'Aggregates Carrier',
            'Limestone Carrier',
            'Landing Craft',
            'Livestock Carrier',
            'Heavy Load Carrier',
            'Crude Oil Tanker',
            'Oil Products Tanker',
            'Chemical / Oil Tanker',
            'LNG Tanker',
            'LPG Tanker',
            'Asphalt / Bitumen',
            'Bunkering Tanker',
            'FSO / FPSO',
            'Other Tanker',
            'Cruise',
            'Passenger',
            'Fishing',
            'Yacht / Sailing',
            'Military',
            'Tug',
            'Other / Auxiliary',
            'Miscellaneous',
            'Unknown'
        ];

        // check filter data has or not
        $filter = $request->only('port', 'to', 'from', 'type');
        $data = Inertia::scroll(fn() => PortCall::filter($filter)
            ->latest()
            ->where('target', 'arrival')
            ->with('port')
            ->paginate());
        return Inertia::render('app/vessel/arrival', [
            'filter' => $filter,
            'country' => $country,
            'ports' => $ports,
            'vesselType' => $vesselType,
            'data' => $data,
        ]);
    }
}
