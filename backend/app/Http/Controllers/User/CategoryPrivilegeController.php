<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class CategoryPrivilegeController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::latest()
                            ->orderBy('id', 'desc')
                            ->get();
                            
        return $this->showAll($categories);
    }

    public function show($id)
    {
        $category  = Category::with([
            'questions' => [
                'choices'
            ]
        ])->findOrFail($id);

        return $this->showOne($category);
    }

}
