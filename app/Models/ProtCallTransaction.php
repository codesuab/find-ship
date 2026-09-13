<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'port_id',
    'date',
    'token',
    'total',
    'type'
)]
class ProtCallTransaction extends Model
{
    public function port(){
        return $this->belongsTo(Prot::class, 'port_id');
    }
}
