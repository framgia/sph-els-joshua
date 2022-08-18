<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UploadAvatar extends Controller
{
    use ApiResponser;
    
    public function store(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);

        if ($request->hasFile('avatar_url'))
        {
            $file = $request->file('avatar_url');
            $filename = $file->getClientOriginalName();
            $fileName = date('His').$filename;
            $request->file('avatar_url')->storeAs('images/', $fileName, 'public');
            $user->avatar_url = "storage/images/$fileName";
            
            $user->update();
        }

        return response()->json([
            'data' => $request->avatar_url
        ]);
    }
}
