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
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->date('dob');
            $table->string('address');
            $table->string('email');
            $table->string('contact_number');
            $table->string('emergency_contact')->nullable();
            $table->string('organization')->nullable();
            $table->string('education_level')->nullable();
            $table->text('why_internship')->nullable();
            $table->string('field_of_interest')->nullable();
            $table->date('available_from')->nullable();
            $table->integer('duration_months')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internship_applications');
    }
};
