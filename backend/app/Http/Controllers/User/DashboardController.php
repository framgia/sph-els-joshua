<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\User;

class DashboardController extends Controller
{
    public function show($id)
    {
        $following_user = User::findOrFail($id)->following;
        $lessonsCount = count(User::findOrFail($id)->lessons);

        $ids = [];
        foreach($following_user as $user)
        {
            $ids[] = $user->id;
        }
        array_push($ids, $id);
    
        $user_activities = ActivityLog::whereIn('user_id', $ids)->orderBy('created_at', 'desc')->get();
    
        $activities = [];
        foreach($user_activities as $activity)
        {
            $name = User::findOrFail($activity->user_id)->name;

            $name = $activity->user_id == $id ? 'You' : $name;
            
            if ($activity['activity_type'] === 'Follow')
            {
                $name .= ' followed ' . User::findOrFail($activity->activity_id)->name;
            }
            if ($activity['activity_type'] === 'Lesson')
            {
                $name .= ' learned ' . Category::findOrFail($activity->activity_id)->title;
            }
            
            $activities[] = [
                'activity' => $name,
                'created_at' => $activity->created_at
            ];
        }

        $user  = User::with([
            'lessons' => [
                'answers' => [
                    'question' => [
                        'category'
                    ]
                ]
            ]
        ])->findOrFail($id);

        return response()->json([
            'data' => $user,
            'activities' => $activities,
            'totalLessons' => $lessonsCount
        ]);
    }

}
