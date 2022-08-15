<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Answer;
use App\Models\Category;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    use ApiResponser;

    public function store(Request $request)
    {
        $lessons = $request->input('lessons');
        $answers = $request->input('answers');

        $new_lesson = Lesson::create($lessons);

        $temp = [];
        $new_answers = [];
        foreach($answers['your_answer'] as $key => $value) 
        {
            if ($value) 
            {
                $temp['lesson_id'] = $new_lesson->id;
                $temp['question_id'] = $key;
                $temp['choice_id'] = $value;
                $new_answers[] = $temp;
            }
        }

        $answer_results = Answer::insert($new_answers);

        return response()->json([
            'lessons' => $new_lesson,
            'answers' => $answer_results
        ]);
    }

    public function show($id)
    {
        $lessons = Lesson::with([
            'answers' => [
                'question' => [
                    'category'
                ]
            ]
        ])->findOrFail($id);
        return $this->showOne($lessons);
    }

}
