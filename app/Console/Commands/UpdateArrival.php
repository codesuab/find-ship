<?php

namespace App\Console\Commands;

use App\Classes\DataDocClass;
use App\Models\ApiCallLimit;
use App\Models\DatadockedApiConfigure;
use App\Models\PortCall;
use App\Models\Prot;
use App\Models\ProtCallTransaction;
use Carbon\Carbon;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

#[Signature('app:update-arrival')]
#[Description('Command description')]
class UpdateArrival extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Get API call limit once
            $apiCallLimit = ApiCallLimit::first();

            $arrivalLimit = $apiCallLimit?->arrival ?? 0;

            if ($arrivalLimit <= 0) {
                Log::warning('Arrival API call limit is not configured.');
                return self::SUCCESS;
            }

            // Get all active ports
            $allPort = Prot::where('status', 'active')->get();

            if ($allPort->isEmpty()) {
                Log::info('No active ports found.');
                return self::SUCCESS;
            }

            foreach ($allPort as $port) {

                // Count API calls for this port in current month
                $usedCalls = ProtCallTransaction::where('type', 'arrival')
                    ->where('port_id', $port->id)
                    ->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year)
                    ->count();

                // Limit reached for this port
                if ($usedCalls >= $arrivalLimit) {
                    Log::info(
                        "Arrival API limit reached for port: {$port->port_code}"
                    );

                    continue;
                }

                // Call API
                $apiInit = new DataDocClass();
                $apiData = $apiInit->portCall(
                    $port->port_code,
                    'arrival',
                    1
                );

                $arrivalData = $apiData['arrival']['list'];

                if (empty($arrivalData)) {
                    Log::info(
                        "No arrival data found for port: {$port->port_code}"
                    );

                    // API call happened, so record transaction
                    ProtCallTransaction::create([
                        'date' => now(),
                        'port_id' => $port->id,
                        'token' => 50,
                        'total' => $apiData['arrival']['total'] ?? 0,
                        'type' => 'arrival',
                    ]);

                    // minus token
                    DatadockedApiConfigure::where('status', 'active')
                        ->decrement('token', 50);

                    continue;
                }
                // Import vessels
                foreach ($arrivalData as $item) {

                    $formattedETA = null;

                    if (!empty($item['formattedETA'])) {
                        try {
                            $eta = Carbon::createFromFormat(
                                'M d, H:i',
                                trim($item['formattedETA'])
                            )->year(now()->year);

                            $currentMonth = now()->startOfMonth();
                            $nextMonth = now()->copy()->addMonth()->startOfMonth();

                            // Current month-এর আগের হলে skip
                            if ($eta->lt($currentMonth)) {
                                continue;
                            }

                            // Next month-এর পর হলে skip
                            if ($eta->gte($nextMonth->copy()->addMonth())) {
                                continue;
                            }

                            $formattedETA = $eta->format('Y-m-d H:i:s');
                        } catch (\Throwable $e) {
                            Log::warning('Invalid ETA format', [
                                'imo' => $item['imo'] ?? null,
                                'eta' => $item['formattedETA'],
                                'error' => $e->getMessage(),
                            ]);

                            continue;
                        }
                    }

                    $importData = [
                        'imo' => $item['imo'] ?? null,
                        'mmsi' => $item['mmsi'] ?? null,
                        'sizes' => $item['sizes'] ?? null,
                        'formattedETA' => $formattedETA,
                        'port_id' => $port->id,
                        'target' => 'arrival',
                        'type' => $item['type']
                    ];

                    if (!empty($item['prev']['rpzone'])) {
                        $importData['last_port'] =
                            $item['prev']['rpzone']['name'] ?? null;
                    }

                    PortCall::updateOrCreate(
                        [
                            'imo' => $item['imo'] ?? null,
                            'mmsi' => $item['mmsi'] ?? null,
                            'port_id' => $port->id,
                            'target' => 'arrival',
                        ],
                        $importData
                    );
                }

                // One API call = one transaction
                ProtCallTransaction::create([
                    'date' => now(),
                    'port_id' => $port->id,
                    'token' => 50,
                    'total' => $apiData['arrival']['total'] ?? 0,
                    'type' => 'arrival',
                ]);

                // minus token
                DatadockedApiConfigure::where('status', 'active')
                    ->decrement('token', 50);

                Log::info(
                    "Arrival data updated successfully for port: {$port->port_code}"
                );
            }

            return self::SUCCESS;
        } catch (\Throwable $th) {

            Log::error('Arrival API request failed.', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
            ]);

            return self::FAILURE;
        }
    }
}
