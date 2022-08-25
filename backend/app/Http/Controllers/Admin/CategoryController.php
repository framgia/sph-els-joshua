<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $categories = Category::latest()
                        ->orderBy('id', 'desc')
                        ->get();

        return $this->showAll($categories);
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|min:3',
            'description' => 'required|min:4'
        ];

        $this->validate($request, $rules);

        $newCategory = Category::create($request->all());

        return $this->showOne($newCategory, 201);
    }

    public function show(Category $category)
    {
        return $this->showOne($category);
    }

    public function update(Request $request, Category $category)
    {
        $category->fill($request->only([
            'title',
            'description'
        ]));

        if ($category->isClean()) {
            return $this->errorResponse('You need to specify any different value to update.', 422);
        }

        $category->save();

        return $this->showOne($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        
        return $this->showOne($category);
    }
}
