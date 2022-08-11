<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\UserRelationship;
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
        $user  = User::with(['following', 'followers'])->findOrFail($id);
        return $this->showOne($user);
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
