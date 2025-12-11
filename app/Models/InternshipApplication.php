<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
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
        'why_internship',
        'field_of_interest',
        'available_from',
        'duration_months',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'dob' => 'date',
        'available_from' => 'date',
        'duration_months' => 'integer',
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
