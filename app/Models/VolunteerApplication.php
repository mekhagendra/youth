<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VolunteerApplication extends Model
{
    protected $fillable = [
        'name',
        'gender',
        'dob',
        'address',
        'email',
        'contact_number',
        'emergency_contact',
        'organization',
        'education_level',
        'why_volunteer',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
