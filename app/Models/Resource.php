<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'publisher',
        'published_date',
        'file_type',
        'file_path',
        'file_size',
        'category',
        'download_count',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_active' => 'boolean',
        'download_count' => 'integer',
        'display_order' => 'integer',
    ];

    /**
     * Scope for active resources
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered resources
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at', 'desc');
    }

    /**
     * Increment download count
     */
    public function incrementDownloads()
    {
        $this->increment('download_count');
    }
}
