<?php

namespace App\Http\Controllers\Ui\Vessel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArrivalController extends Controller
{
    // index
    public function index(Request $request)
    {
        $filter = $request->only('search');

        return Inertia::render('app/vessel/arrival', [
            'filter' => $filter,
        ]);
    }
}
