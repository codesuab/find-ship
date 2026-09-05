<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(
    'name',
    'slug',
    'permissions',
)]
class Role extends Model
{
    protected $casts = [
        'permissions' => 'array',
        'created_at' => 'date:d M, Y'
    ];

    public function admins(): HasMany
    {
        return $this->hasMany(Admin::class);
    }

    public function hasPermission(string $permission): bool
    {
        [$module, $action] = explode('.', $permission, 2);

        return in_array(
            $action,
            $this->permissions[$module] ?? [],
            true
        );
    }

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search']) && is_string($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $search = '%' . $filters['search'] . '%';

                $q->where('name', 'like', $search);
            });
        }
    }
}
