<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'name',
    'imo',
    'mmsi',
    'country_iso',
    'country',
    'ship_type',
    'type_specific',
    'gross_tonnage',
    'net_tonnage',
    'teu',
    'length',
    'beam',
    'year_of_built',
    'callsign',
    'eni',
    'deadweight',
    'bale',
    'hull',
    'ballast_water',
    'fresh_water',
    'crude_oil',
    'gas',
    'grain',
    'builder',
    'material',
    'place_of_build',

    // Engine
    'fuel_type',
    'propeller',
    'engine_type',
    'engine_builder',
    'engine_power_kw',

    // Management
    'p_i',
    'ism',
    'ism_web',
    'ism_email',
    'ism_address',
    'ism_website',
    'manager',
    'manager_website',
    'manager_email',
    'manager_address',
    'registered_owner',
    'registered_owner_email',
    'registered_owner_address',
    'registered_owner_website',
    'classification_society',
)]
class VesselInformation extends Model
{
    protected $casts = [
        'ism_web' => 'array',
        'ism_email' => 'array',
        'manager_website' => 'array',
        'manager_email' => 'array',
    ];
}
