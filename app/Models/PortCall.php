<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'imo',
    'mmsi',
    'sizes',
    'formattedETA',
    'atdUtc',
    'speed',
    'course',
    'latitude',
    'longitude',
    'type',
    'last_port',
    'port_id',
    'target',
)]
class PortCall extends Model
{

    protected $casts = [
        'formattedETA' => 'date:M d, Y',
        'atdUtc' => 'date:M d, Y',
    ];

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['port'])  && is_string($filters['port'])) {
            $query->where('port_id', $filters['port']);
        }
        if (!empty($filters['type'])  && is_string($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        if (!empty($filters['from']) && is_string($filters['from'])) {
            $query->whereDate('formattedETA', '>=', $filters['from']);
        }

        if (!empty($filters['to']) && is_string($filters['to'])) {
            $query->whereDate('formattedETA', '<=', $filters['to']);
        }
    }

    public function port()
    {
        return $this->belongsTo(Prot::class, 'port_id');
    }
}
