<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supporter;
use Illuminate\Http\Request;

class SupporterController extends Controller
{
    /**
     * Get active supporters for frontend display
     */
    public function index()
    {
        $supporters = Supporter::active()
            ->ordered()
            ->select('id', 'name', 'logo_path', 'website_url')
            ->get()
            ->map(function ($supporter) {
                return [
                    'id' => $supporter->id,
                    'name' => $supporter->name,
                    'src' => $supporter->logo_url,
                    'website_url' => $supporter->website_url
                ];
            });

        return response()->json($supporters);
    }
}
