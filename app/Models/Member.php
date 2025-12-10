<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'membership_id',
        'name',
        'member_since',
        'address',
        'phone',
        'email',
        'description',
        'photo',
        'show_phone',
        'show_email',
        'is_active',
        'is_lifetime_member',
        'is_self_registered',
    ];

    protected $casts = [
        'member_since' => 'date',
        'is_active' => 'boolean',
        'is_lifetime_member' => 'boolean',
        'is_self_registered' => 'boolean',
        'show_phone' => 'boolean',
        'show_email' => 'boolean',
    ];

    /**
     * Get all teams this member belongs to
     */
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_members')
            ->withPivot('designation', 'rank')
            ->withTimestamps();
    }
}
