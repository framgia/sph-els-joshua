<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\ApiResponser;

class CategoryPrivilegeController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $categories = Category::with(['lessons'])
                            ->orderBy('id', 'desc')
                            ->get();
                            
        return $this->showAll($categories);
    }

    public function show(Category $category_privilege)
    {
        $category  = $category_privilege->with([
            'questions' => [
                'choices'
            ]
        ])->findOrFail($category_privilege->id);

        return $this->showOne($category);
    }

}
