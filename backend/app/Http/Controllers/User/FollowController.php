<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRelationship;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    use ApiResponser;
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $follow = UserRelationship::create([
            'follower_id' => Auth::user()->id,
            'following_id' => $request->following_id
        ]);
        return $this->showOne($follow, 201);
    }


    public function update(Request $request, User $user)
    {
        $following_id = $request->input('following_id');
        $user_relationships = UserRelationship::all();

        foreach($user_relationships as $item) 
        {
            if ($item['following_id'] == $following_id && $item['follower_id'] == Auth::user()->id) 
            {
                $item->delete();
            }
        }
        
        return $this->showOne($user);
    }
}
