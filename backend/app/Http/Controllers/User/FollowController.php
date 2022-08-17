<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\User;
use App\Models\UserRelationship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
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

        $activity_logs = ActivityLog::create([
            'user_id' => Auth::user()->id,
            'activity_id' => $follow->following_id,
            'activity_type' => 'Follow'
        ]);

        return response()->json([
            'data' => $follow,
            'activity_logs' => $activity_logs
        ]);
    }


    public function update(Request $request)
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

        $activity_logs = ActivityLog::all();

        foreach($activity_logs as $item) 
        {
            if ($item['user_id'] == Auth::user()->id && $item['activity_id'] == $following_id) 
            {
                $item->delete();
            }
        }
        
        return response()->json([
            'user_relationships' => $user_relationships,
            'activity_logs' => $activity_logs
        ]);
    }
}
