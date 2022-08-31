<?php

namespace App\Http\Controllers\User;

use App\Models\Category;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryPrivilegeResource;
use App\Http\Resources\CategoryQuestionChoicesResource;

class CategoryPrivilegeController extends Controller
{
    use ApiResponser;

    public function index()
    {
        return CategoryPrivilegeResource::collection(Category::with('lessons')->orderByDesc('id')->get());
    }

    public function show(Category $category_privilege)
    {
        $category  = $category_privilege->with([
            'questions:id,category_id,value' => [
                'choices:id,question_id,value,is_correct'
            ]
        ])->findOrFail($category_privilege->id);

        return new CategoryQuestionChoicesResource($category);
    }

}
