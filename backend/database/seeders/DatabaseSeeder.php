<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        Category::truncate();

        User::factory(60)->create();
        User::factory()->create([
            'name' => 'Joshua Galit',
            'avatar_url' => 'https://avatars.githubusercontent.com/u/108642414?v=4',
            'email' => 'joshuaimalay@gmail.com',
            'password' => bcrypt('123456'),
            'is_admin' => true
        ]);

        Category::factory(60)->create();
    }
}
