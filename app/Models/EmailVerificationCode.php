<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'email',
    'code_hash',
    'expires_at',
    'verified_at',
    'attempts',
    'last_sent_at',
])]
class EmailVerificationCode extends Model
{
    //
}
