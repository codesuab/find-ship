<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'country_id',
    'name',
    'port_code',
    'status'
)]
class Prot extends Model
{
    protected $casts = [
        'created_at' => 'date:d M, y',
        'updated_at' => 'date:d M, y',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search']) && is_string($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $search = '%' . $filters['search'] . '%';

                $q->where('name', 'like', $search)
                    ->orWhere('port_code', 'like', $search);
            });
        }

        if (!empty($filters['country_id'])  && is_string($filters['country_id'])) {
            $query->where('country_id', $filters['country_id']);
        }
    }
}
