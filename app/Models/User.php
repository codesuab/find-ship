<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'phone',
    'address',
    'avatar',
    'gender',
    'county',
    'city',
    'zip',

    'plan_id',
    'plan_started_at',
    'plan_expires_at',

    'company_logo',
    'company_name',
    'company_type',
    'company_address',

    'balance',

    'status',
    'status_message',
    'last_login_at',
    'last_login_ip',
    'login_device_id',
    'login_device_name',
    'login_browser',
    'login_os',

    'google_id',
    'google_token',
    'google_refresh_token',

    'facebook_id',
    'facebook_token',
    'facebook_refresh_token',

    'email_verified_at',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
