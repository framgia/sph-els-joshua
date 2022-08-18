<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where('id', '!=', Auth::user()->id)
                    ->orderBy('id', 'desc')
                    ->get();
                    
        return $this->showAll($users);        
    }
}
