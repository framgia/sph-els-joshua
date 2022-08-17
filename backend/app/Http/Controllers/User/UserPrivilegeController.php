<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Support\Facades\Auth;

class UserPrivilegeController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['following', 'followers'])
                    ->where('id', '!=', Auth::user()->id)
                    ->orderBy('id', 'desc')
                    ->get();

        return $this->showAll($users);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user  = User::with([
            'following', 
            'followers',
            'lessons' => [
                'answers' => [
                    'question' => [
                        'category'
                    ]
                ]
            ],
            'activity_logs'
        ])->findOrFail($id);

        $activities = [];
        foreach($user->activity_logs as $key => $value)
        {
            if ($value['activity_type'] === 'Follow')
            {
                $following_user = User::find($value->activity_id);
                $activities[] = [
                    'following_user' => $following_user,
                    'created_at' => $value->created_at
                ];
            }
            if ($value['activity_type'] === 'Lesson')
            {
                $user_lesson = Lesson::with([
                    'answers' => [
                        'question' => [
                            'category'
                        ]
                    ]
                ])->find($value->activity_id);
                $activities[] = [
                    'lessons' => $user_lesson,
                    'created_at' => $value->created_at
                ];
            }
        }

        return response()->json([
            'data' => $user,
            'activities' => $activities
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $user->fill($request->only([
            'name',
            'email'
        ]));

        if ($user->isClean()) {
            return $this->errorResponse('You need to specify any different details to update.', 422);
        }

        $user->save();

        return $this->showOne($user);
    }
    
}
