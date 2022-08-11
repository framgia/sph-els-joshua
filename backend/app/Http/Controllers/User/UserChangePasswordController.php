<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;

class UserChangePasswordController extends Controller
{
    use ApiResponser;

    public function update(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required'],
            'confirm_password' => ['same:new_password'],
        ]);

        $user = User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);
        
        return response()->json([
            'data' => $user
        ]);
    }
}
