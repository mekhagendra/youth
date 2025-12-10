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
        $driver = DB::getDriverName();
        
        // Disable foreign key checks based on driver
        if ($driver === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        } elseif ($driver === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF;');
        }
        
        // Clear existing data
        DB::table('contents')->delete();
        DB::table('users')->delete();
        
        // Re-enable foreign key checks based on driver
        if ($driver === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        } elseif ($driver === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        }

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
