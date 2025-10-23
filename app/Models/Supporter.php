<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Supporter extends Model
{
    protected $fillable = [
        'name',
        'logo_path',
        'website_url',
        'display_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer'
    ];

    // Scope for active supporters
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for ordered supporters
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }

    // Get the full URL for the logo
    public function getLogoUrlAttribute()
    {
        if ($this->logo_path) {
            return Storage::url($this->logo_path);
        }
        return null;
    }

    // Delete logo file when supporter is deleted
    protected static function boot()
    {
        parent::boot();
        
        static::deleting(function ($supporter) {
            if ($supporter->logo_path && Storage::exists($supporter->logo_path)) {
                Storage::delete($supporter->logo_path);
            }
        });
    }
}
