<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'label',
    'uri',
    'token',
    'key',
    'status'
)]
class DatadockedApiConfigure extends Model
{
    protected $casts = [
        'created_at'=>'date:d M, Y'
    ];


    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search']) && is_string($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $search = '%' . $filters['search'] . '%';

                $q->where('label', 'like', $search);
            });
        }
    }
}
