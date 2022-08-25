<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Lesson;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Choice;
use App\Models\Question;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        foreach($answers as $value) 
        {
            if ($value) 
            {
                $temp['lesson_id'] = $new_lesson->id;
                $temp['question_id'] = $value['question_id'];
                $temp['choice_id'] = $value['choice_id'];
                $temp['is_correct'] = $value['is_correct'];
                $new_answers[] = $temp;
            }
        }

        Answer::insert($new_answers);

        ActivityLog::create([
            'user_id' => Auth::user()->id,
            'activity_id' => $new_lesson->id,
            'activity_type' => 'Lesson'
        ]);

        return response()->json([
            'lesson_id' => $new_lesson->id, 
            'message' => 'You successfully submitted you answer!'
        ]);
    }

    public function show(Lesson $lesson)
    {
        $get_category_title = Category::findOrFail($lesson->category_id)->title;
        $count_question = count($lesson->answers);

        $get_correct_answer = [];
        $question_and_answer = [];
        foreach ($lesson->answers as $value)
        {
            if ($value['is_correct'])
            {
                $get_correct_answer[] = $value['is_correct'];
            }

            $question_and_answer[] = [
                'question_title' => Question::findOrFail((string)$value['question_id'])->value,
                'is_correct' => $value['is_correct'],
                'your_answer' => Choice::findOrFail((string)$value['choice_id'])->value
            ];
        }
        
        return response()->json([
            'data' => [
                'name' => Auth::user()->id === $lesson->user_id ? 'Your' : User::findOrFail($lesson->user_id)->name,
                'get_category_title' => $get_category_title,
                'get_question_and_answer' => $question_and_answer,
                'count_question' => $count_question,
                'count_correct_answer' => count($get_correct_answer)
            ]
        ]);
    }

}
