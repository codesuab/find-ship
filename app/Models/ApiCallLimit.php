<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'arrival',
    'departure',
    'expected',
    'in_port'
)]
class ApiCallLimit extends Model
{
    //
}
