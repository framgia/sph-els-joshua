<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Lesson;
use App\Models\Answer;
use App\Models\Category;
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
        foreach($answers['yourAnswer'] as $key => $value) 
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

        $activity_logs = ActivityLog::create([
            'user_id' => Auth::user()->id,
            'activity_id' => $new_lesson->id,
            'activity_type' => 'Lesson'
        ]);

        return response()->json([
            'lessons' => $new_lesson,
            'answers' => $answer_results,
            'activity_logs' => $activity_logs
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
