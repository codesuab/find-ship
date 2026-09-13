<?php

namespace App\Console\Commands;

use App\Classes\DataDocClass;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:update-arrival')]
#[Description('Command description')]
class UpdateArrival extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        $apiInit = new DataDocClass();
        // $apiInit->portCall();
    }
}
