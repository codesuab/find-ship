<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'driver',
    'host',
    'port',
    'username',
    'password',
    'encryption',
    'from_address',
    'from_name',
    'is_active',
])]
class SmtpConfig extends Model
{
    //
}
