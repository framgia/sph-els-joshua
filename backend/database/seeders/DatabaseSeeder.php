<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Choice;
use App\Models\Question;
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

        User::factory(4)->create();
        User::factory()->create([
            'name' => 'Joshua Galit',
            'avatar_url' => 'https://avatars.githubusercontent.com/u/108642414?v=4',
            'email' => 'joshuaimalay@gmail.com',
            'password' => bcrypt('123456'),
            'is_admin' => true
        ]);
        User::factory()->create([
            'name' => 'Gilchrist Calunia',
            'avatar_url' => 'https://avatars.githubusercontent.com/u/65806779?v=4',
            'email' => 'gil@gmail.com',
            'password' => bcrypt('123456'),
            'is_admin' => false
        ]);

        Category::factory(4)
                ->create()
                ->each(function ($category) {
                    Question::factory(3)
                            ->create(['category_id' => $category->id])
                            ->each(function ($question) {
                                Choice::factory(4)
                                      ->create([
                                        'question_id' => $question->id
                                    ]);
                            });
                });
    }
}
