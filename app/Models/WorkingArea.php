<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WorkingArea extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_path',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Automatically generate slug from title
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($workingArea) {
            if (empty($workingArea->slug)) {
                $workingArea->slug = Str::slug($workingArea->title);
            }
        });

        static::updating(function ($workingArea) {
            if ($workingArea->isDirty('title') && empty($workingArea->slug)) {
                $workingArea->slug = Str::slug($workingArea->title);
            }
        });
    }

    /**
     * Scope for active working areas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered working areas
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at', 'desc');
    }

    /**
     * Get the image URL
     */
    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }
}
