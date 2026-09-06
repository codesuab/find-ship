<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vessel_information', function (Blueprint $table) {
            $table->id();

            $table->string('name')->comment('Vessel name');
            $table->string('imo')->nullable()->comment('International Maritime Organization number');
            $table->string('mmsi')->nullable()->comment('Maritime Mobile Service Identity');
            $table->string('country_iso')->nullable()->comment('Flag country ISO code');
            $table->string('country')->nullable()->comment('Flag country');
            $table->string('ship_type')->nullable()->comment('Vessel type');
            $table->string('type_specific')->nullable()->comment('Specific vessel type');

            $table->string('gross_tonnage')->nullable()->comment('Gross tonnage');
            $table->string('net_tonnage')->nullable()->comment('Net tonnage');
            $table->string('teu')->nullable()->comment('Twenty-foot Equivalent Unit capacity');
            $table->string('length')->nullable()->comment('Vessel length');
            $table->string('beam')->nullable()->comment('Vessel beam width');
            $table->string('year_of_built')->nullable()->comment('Year the vessel was built');
            $table->string('callsign')->nullable()->comment('Vessel radio call sign');
            $table->string('eni')->nullable()->comment('European Vessel Identification Number');
            $table->string('deadweight')->nullable()->comment('Deadweight tonnage');

            $table->string('bale')->nullable()->comment('Bale capacity');
            $table->string('hull')->nullable()->comment('Hull type');
            $table->string('ballast_water')->nullable()->comment('Ballast water capacity');
            $table->string('fresh_water')->nullable()->comment('Fresh water capacity');
            $table->string('crude_oil')->nullable()->comment('Crude oil capacity');
            $table->string('gas')->nullable()->comment('Gas capacity');
            $table->string('grain')->nullable()->comment('Grain capacity');

            $table->string('builder')->nullable()->comment('Ship builder');
            $table->string('material')->nullable()->comment('Construction material');
            $table->string('place_of_build')->nullable()->comment('Place where the vessel was built');

            // Engine
            $table->string('fuel_type')->nullable()->comment('Engine fuel type');
            $table->string('propeller')->nullable()->comment('Propeller details');
            $table->string('engine_type')->nullable()->comment('Main engine type');
            $table->string('engine_builder')->nullable()->comment('Engine manufacturer');
            $table->string('engine_power_kw')->nullable()->comment('Engine power in kilowatts');

            // Management
            $table->string('p_i')->nullable()->comment('Protection and Indemnity insurer');
            $table->string('ism')->nullable()->comment('ISM company');
            $table->json('ism_web')->nullable()->comment('ISM company website');
            $table->json('ism_email')->nullable()->comment('ISM company email');
            $table->text('ism_address')->nullable()->comment('ISM company address');
            $table->string('ism_website')->nullable()->comment('ISM company website');

            $table->string('manager')->nullable()->comment('Vessel manager');
            $table->json('manager_website')->nullable()->comment('Manager website');
            $table->json('manager_email')->nullable()->comment('Manager email');
            $table->text('manager_address')->nullable()->comment('Manager address');

            $table->string('registered_owner')->nullable()->comment('Registered vessel owner');
            $table->string('registered_owner_email')->nullable()->comment('Registered owner email');
            $table->text('registered_owner_address')->nullable()->comment('Registered owner address');
            $table->string('registered_owner_website')->nullable()->comment('Registered owner website');

            $table->string('classification_society')->nullable()->comment('Classification society');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vessel_information');
    }
};
