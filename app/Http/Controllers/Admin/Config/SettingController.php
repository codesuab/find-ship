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
        // api call rate limit
        $apiCall = ApiCallLimit::first();


        // cron job command
        $projectPath = base_path();
        $commandSchedule = "cd {$projectPath} && php artisan schedule:run >> /dev/null 2>&1";
        $commandQueue = "cd {$projectPath} && php artisan queue:work --stop-when-empty --tries=3 --timeout=120 >> /dev/null 2>&1";

        return Inertia::render('admin/config/setting', [
            'apiCall' => $apiCall,
            'command' => [
                'commandSchedule' => $commandSchedule,
                'commandQueue' => $commandQueue
            ]
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
