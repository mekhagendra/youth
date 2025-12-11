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
        Schema::table('users', function (Blueprint $table) {
            // Add new user_type column as enum
            $table->enum('user_type', [
                'Guest',
                'Member',
                'Volunteer',
                'Intern',
                'Employee',
                'System Admin',
                'System Manager'
            ])->default('Guest')->after('email');
            
            // Add status column
            $table->enum('status', ['Pending', 'Active', 'Inactive', 'Rejected'])
                ->default('Active')
                ->after('user_type');
            
            // Add is_active boolean for quick checks
            $table->boolean('is_active')->default(true)->after('status');
        });
        
        // Migrate existing role data to user_type
        DB::table('users')->update([
            'user_type' => DB::raw("CASE 
                WHEN role = 'admin' THEN 'System Admin'
                WHEN role = 'member' THEN 'Member'
                WHEN role = 'user' THEN 'Guest'
                ELSE 'Guest'
            END")
        ]);
        
        // Drop the old role column (with index)
        Schema::table('users', function (Blueprint $table) {
            // Drop index first if it exists
            $table->dropIndex(['role']); // SQLite requires dropping indexes before column
            $table->dropColumn('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Restore role column
            $table->enum('role', ['admin', 'member', 'user'])->default('user')->after('email');
        });
        
        // Migrate user_type back to role
        DB::table('users')->update([
            'role' => DB::raw("CASE 
                WHEN user_type = 'System Admin' THEN 'admin'
                WHEN user_type = 'System Manager' THEN 'admin'
                WHEN user_type = 'Member' THEN 'member'
                WHEN user_type = 'Volunteer' THEN 'member'
                WHEN user_type = 'Intern' THEN 'member'
                WHEN user_type = 'Employee' THEN 'member'
                ELSE 'user'
            END")
        ]);
        
        // Drop new columns
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['user_type', 'status', 'is_active']);
        });
    }
};
