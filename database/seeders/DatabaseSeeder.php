<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Clear existing data
        DB::table('contents')->truncate();
        DB::table('users')->truncate();
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@youth.org'],
            [
                'name' => 'Youth Initiative Admin',
                'password' => 'admin123',
                'email_verified_at' => now(),
                'role' => 'admin',
            ]
        );
    }
}
