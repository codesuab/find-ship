<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\SmtpConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmtpController extends Controller
{
    // index
    public function index()
    {
        $data = SmtpConfig::first();

        return Inertia::render('admin/config/smtp', [
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'driver' => 'required',
            'port' => 'required',
            'host' => 'required',
            'username' => 'required',
            'password' => 'required',
            'encryption' => 'required|in:ssl,tls',
            'from_address' => 'required',
            'from_name' => 'required'
        ]);

        SmtpConfig::updateOrCreate(['id' => $request->id], $request->except('id'));

        return back()->with('success', 'Saved Success')->with('_flash_id', time());
    }
}
