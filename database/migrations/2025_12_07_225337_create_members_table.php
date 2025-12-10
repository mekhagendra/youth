<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('members', function (Blueprint $table) {
        $table->id();

        // Membership details
        $table->string('membership_id')->unique();  // e.g., MB0001
        $table->string('name');  
        $table->date('member_since')->nullable(); // first registration date

        // Contact + profile details
        $table->string('address')->nullable();
        $table->string('phone')->nullable();
        $table->string('email')->unique();
        $table->text('description')->nullable();
        $table->string('photo')->nullable(); // store path

        // Visibility control
        $table->boolean('show_phone')->default(true);
        $table->boolean('show_email')->default(true);

        // Status
        $table->boolean('is_active')->default(false);  // default "NO" for user signup
        $table->boolean('is_lifetime_member')->default(false);

        // If signup by member directly
        $table->boolean('is_self_registered')->default(false);

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
