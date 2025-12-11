<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('voice_of_changes', function (Blueprint $table) {
            $table->boolean('published_online')->default(false)->after('status');
        });
        
        // Set existing approved messages to be published online
        DB::table('voice_of_changes')
            ->where('status', 'approved')
            ->update(['published_online' => true]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voice_of_changes', function (Blueprint $table) {
            $table->dropColumn('published_online');
        });
    }
};
