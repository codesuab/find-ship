<?php

namespace App\Classes;

use App\Models\DatadockedApiConfigure;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class DataDocClass
{
    protected ?string $api_key = null;
    protected ?string $endpoint = null;

    public function __construct()
    {
        $api = $this->getApiKey();

        if ($api) {
            $this->api_key = $api->key;
            $this->endpoint = $api->uri;
        }
    }

    protected function getApiKey()
    {
        return DatadockedApiConfigure::where('status', 'active')->first();
    }

    protected function checkStatus()
    {
        if (!$this->api_key) {
            throw new RuntimeException('API key not configured.');
        }

        if (!$this->endpoint) {
            throw new RuntimeException('API endpoint not configured.');
        }

        return true;
    }

    // balance
    public function checkBalance()
    {
        $this->checkStatus();

        $response = Http::withHeaders([
            'accept' => 'application/json',
            'x-api-key' => $this->api_key,
        ])->get(
            $this->endpoint . '/vessels_operations/my-credits'
        );

        return $response->json();
    }

    public function checkBalanceBy($api_key, $endpoint)
    {
        if (!$api_key) {
            throw new RuntimeException('API key not configured.');
        }
        if (!$endpoint) {
            throw new RuntimeException('API endpoint not configured.');
        }
        
        $response = Http::withHeaders([
            'accept' => 'application/json',
            'x-api-key' => $api_key,
        ])->get(
            $endpoint . '/vessels_operations/my-credits'
        );

        return $response->json();
    }
    
    // port call
    public function portCall(){
         $this->checkStatus();
    }
}
