<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = User::with(['following', 'lessons'])->findOrFail(Auth::user()->id);

        $ids = [];
        foreach($user->following as $usr)
        {
            $ids[] = $usr->id;
        }
        array_push($ids, $user->id);
    
        $user_activities = ActivityLog::whereIn('user_id', $ids)->orderBy('created_at', 'desc')->get();
    
        $activities = [];
        $get_all_correct_lessons = [];
        foreach($user_activities as $activity)
        {
            $name = User::findOrFail($activity->user_id)->name;

            $name = $activity->user_id == Auth::user()->id ? 'You' : $name;
            
            if ($activity['activity_type'] === 'Follow')
            {
                $name .= ' <b>followed</b> ' . User::findOrFail($activity->activity_id)->name;
            }
            if ($activity['activity_type'] === 'Lesson')
            {
                $lesson = Lesson::findOrFail($activity->activity_id);

                $get_correct_answer = [];
                foreach ($lesson->answers as $value)
                {
                    if ($value['is_correct'])
                    {
                        $get_correct_answer[] = $value['is_correct'];
                    }

                    if ($activity->user_id === Auth::user()->id && $value['is_correct'])
                    {
                        $get_all_correct_lessons[] = $value['is_correct'];
                    }
                }
                
                $name .= ' <b>learned</b> ' . 
                        count($get_correct_answer)  . ' of ' . 
                        count($lesson->answers) . ' in ' . 
                        Category::findOrFail($lesson->category_id)->title;
            }
            
            $activities[] = [
                'activity_title' => $name,
                'created_at' => $activity->created_at
            ];
        }

        return response()->json([
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'avatar_url' => $user->avatar_url
                ],
                'lessons' => [
                    'count_correct_lessons_answer' => count($get_all_correct_lessons),
                    'count_lessons_taken' => count($user->lessons)
                ],
                'activities' => $activities
            ]
        ]);
    }

}
