<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;

class ProfileController extends Controller
{
    public function index()
    {
        return User::select('id')->pluck('id');
    }

    public function show(User $profile)
    {
        return response()->json([
            'data' => $profile
        ]);
    }
}
