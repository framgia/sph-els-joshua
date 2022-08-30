<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Choice;
use App\Models\Question;
use Faker\Provider\Lorem;
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
        User::factory()->create([
            'name' => 'Joshua Galit',
            'email' => 'joshuaimalay@gmail.com',
            'password' => bcrypt('123456'),
            'is_admin' => true
        ]);
        User::factory()->create([
            'name' => 'Gilchrist Calunia',
            'email' => 'gil@gmail.com',
            'password' => bcrypt('123456'),
            'is_admin' => false
        ]);


        // Japanese Zone
        $category = Category::create([
                    'title' => 'Japanese Language',
                    'description' => Lorem::text()
                ]);

        // Question 1
        $question = $category->questions()->save(
            new Question([
                'value' => 'Ato dorekurai kakari mas ka?'
            ])
        );
        // Question 1 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'How long will it take?', 'is_correct' => true]),
            new Choice(['value' => 'Once again please.']),
            new Choice(['value' => 'Welcom, thank you for coming'])
        ]);

        // Question 2
        $question2 = $category->questions()->save(
            new Question([
                'value' => 'Youkoso okoshi kudasaimashita'
            ])
        );

        // Question 2 with Choices
        $question2->choices()->saveMany([
            new Choice(['value' => 'Please enjoy your stay']),
            new Choice(['value' => 'Welcom, thank you for coming', 'is_correct' => true]),
            new Choice(['value' => 'How long will it take?']),
            new Choice(['value' => "I don't understand."])
        ]);

        // Question 3
        $question3 = $category->questions()->save(
            new Question([
                'value' => 'Kinishinai de!'
            ])
        );

        // Question 3 with Choices
        $question3->choices()->saveMany([
            new Choice(['value' => "That's okay."]),
            new Choice(['value' => 'Welcom, thank you for coming']),
            new Choice(['value' => 'No worries.', 'is_correct' => true]),
            new Choice(['value' => "Noted./Certainly"])
        ]);

        // Question 4
        $question4 = $category->questions()->save(
            new Question([
                'value' => 'Daijoubu desu'
            ])
        );

        // Question 4 with Choices
        $question4->choices()->saveMany([
            new Choice(['value' => "That's okay.", 'is_correct' => true]),
            new Choice(['value' => "That's nice!"]),
            new Choice(['value' => 'Is there something wrong?']),
            new Choice(['value' => "Noted./Certainly"])
        ]);

        // End of Japanese



        // Waray waray
        $category = Category::create([
            'title' => 'Waray-waray Language',
            'description' => Lorem::text()
        ]);

        // Question 1
        $question = $category->questions()->save(
            new Question([
                'value' => 'Maupay na Aga'
            ])
        );
        // Question 1 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Maayong gabie']),
            new Choice(['value' => 'Maayong buntag', 'is_correct' => true]),
            new Choice(['value' => 'Maayong hapon'])
        ]);

        // Question 2
        $question = $category->questions()->save(
            new Question([
                'value' => 'Maupay na Kulop'
            ])
        );
        // Question 2 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Thank you']),
            new Choice(['value' => 'Maayong buntag']),
            new Choice(['value' => 'Good afternoon', 'is_correct' => true]),
            new Choice(['value' => 'Good evening'])
        ]);

         // Question 3
         $question = $category->questions()->save(
            new Question([
                'value' => 'Waray Sapayan'
            ])
        );
        // Question 3 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Good afternoon']),
            new Choice(['value' => "You're Welcome", 'is_correct' => true]),
            new Choice(['value' => 'Good afternoon']),
            new Choice(['value' => 'Thank you so much'])
        ]);



        // Waray waray
        $category = Category::create([
            'title' => 'Ilonggo Language',
            'description' => Lorem::text()
        ]);

        // Question 1
        $question = $category->questions()->save(
            new Question([
                'value' => 'Mayong gabi'
            ])
        );
        // Question 1 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Good afternoon']),
            new Choice(['value' => 'Good evening', 'is_correct' => true]),
            new Choice(['value' => 'Thank you']),
            new Choice(['value' => 'Thank you so much'])
        ]);

        // Question 2
        $question = $category->questions()->save(
            new Question([
                'value' => 'Mayong gabi'
            ])
        );
        // Question 2 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Good afternoon']),
            new Choice(['value' => 'Good evening', 'is_correct' => true]),
            new Choice(['value' => 'Thank you']),
            new Choice(['value' => 'Thank you so much'])
        ]);

        // Question 3
        $question = $category->questions()->save(
            new Question([
                'value' => 'Wala problema'
            ])
        );
        // Question 3 with Choices
        $question->choices()->saveMany([
            new Choice(['value' => 'Thank you so much']),
            new Choice(['value' => 'Good evening']),
            new Choice(['value' => 'Thank you']),
            new Choice(['value' => "You're Welcome", 'is_correct' => true])
        ]);
        
    }
}
