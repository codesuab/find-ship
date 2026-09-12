<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'imo',
    'mmsi',
    'type',
    'year',
    'country',
    'sizes',
    'formattedETA',
    'target',
)]
class PortCall extends Model
{
    //
}
