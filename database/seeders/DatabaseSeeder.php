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

        // Create default System Admin user
        User::firstOrCreate(
            ['email' => 'admin@youth.org.np'],
            [
                'name' => 'Youth Initiative Admin',
                'password' => 'admin123',
                'email_verified_at' => now(),
                'user_type' => 'System Admin',
                'status' => 'Active',
                'is_active' => true,
            ]
        );
        
        // Update existing admin@youth.org if it exists
        $oldAdmin = User::where('email', 'admin@youth.org')->first();
        if ($oldAdmin) {
            $oldAdmin->update([
                'user_type' => 'System Admin',
                'status' => 'Active',
                'is_active' => true,
            ]);
        }
    }
}