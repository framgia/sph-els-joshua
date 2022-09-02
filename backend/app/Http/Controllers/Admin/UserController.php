<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    use ApiResponser;

    public function index()
    {
        return UserResource::collection(User::whereNot('id', Auth::user()->id)->get());
    }
}
