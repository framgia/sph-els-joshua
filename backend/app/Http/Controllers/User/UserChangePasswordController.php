<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserChangePasswordRequest;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\Hash;

class UserChangePasswordController extends Controller
{
    use ApiResponser;

    public function update(UserChangePasswordRequest $request)
    {
        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);
        return response()->noContent();
    }
}
