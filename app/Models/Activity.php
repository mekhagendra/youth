<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'description',
        'content',
        'image_path',
        'location',
        'date',
        'category',
        'participants',
        'organizer',
        'status',
        'is_active',
        'sort_order',
        'user_id'
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'participants' => 'integer',
    ];

    // Relationship with User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('date', 'desc');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming')->where('date', '>=', Carbon::today());
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function getFormattedDateAttribute()
    {
        return Carbon::parse($this->date)->format('F j, Y');
    }

    public function getCategoryBadgeColorAttribute()
    {
        return match($this->category) {
            'workshop' => 'bg-blue-100 text-blue-800',
            'seminar' => 'bg-green-100 text-green-800',
            'training' => 'bg-purple-100 text-purple-800',
            'community' => 'bg-yellow-100 text-yellow-800',
            'awareness' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    public function getStatusBadgeColorAttribute()
    {
        return match($this->status) {
            'upcoming' => 'bg-blue-100 text-blue-800',
            'ongoing' => 'bg-green-100 text-green-800',
            'completed' => 'bg-gray-100 text-gray-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
