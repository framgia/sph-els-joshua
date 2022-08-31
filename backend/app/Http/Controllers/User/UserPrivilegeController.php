<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\Lesson;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserPrivilegeResource;

class UserPrivilegeController extends Controller
{
    use ApiResponser;

    public function index()
    {
        return UserPrivilegeResource::collection(
            User::with(['following', 'followers'])
                ->whereNot('id', Auth::user()->id)
                ->orderByDesc('id')
                ->get()
            );
    }

    public function show(User $user_privilege)
    {
        $user = $user_privilege->with([
            'following', 
            'followers',
            'activity_logs'
        ])->findOrFail($user_privilege->id);

        $activities = [];
        foreach($user->activity_logs as $activity)
        {
            $name = User::findOrFail($activity->user_id)->name;

            $name = $activity->user_id === Auth::user()->id ? 'You' : explode(' ', $name, 2)[0];
            
            if ($activity['activity_type'] === 'Follow')
            {
                $name .= ' <b className="font-bold">followed</b> ' . User::findOrFail($activity->activity_id)->name;
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
                    'avatar_url' => $user->avatar_url,
                    'followings' => $user->following,
                    'followers' => $user->followers,
                    'count_followings' => count($user->following),
                    'count_followers' => count($user->followers)
                ],
                'activities' => $activities
            ]
        ]);
    }

    public function update(Request $request, User $user_privilege)
    {
        $user_privilege->fill($request->only([
            'name',
            'email'
        ]));

        if ($user_privilege->isClean()) {
            return $this->errorResponse('You need to specify any different details to update.', 422);
        }

        $user_privilege->save();

        return $this->showOne($user_privilege);
    }
    
}
