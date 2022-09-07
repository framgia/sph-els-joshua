<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        return User::select('id')->get();
    }

    public function show(User $profile)
    {
        return response()->json([
            'data' => $profile
        ]);
    }
}
