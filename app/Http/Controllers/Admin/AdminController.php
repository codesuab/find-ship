<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // index
    public function index(Request $request)
    {

        $data = Admin::filter($request->only('search'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/admin', [
            'data' => $data,
            'filter' => $request->only('search')
        ]);
    }
}
