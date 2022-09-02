<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    use ApiResponser;

    public function index()
    {
        return CategoryResource::collection(Category::latest()->orderByDesc('id')->get());
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|min:3',
            'description' => 'required|min:4'
        ];

        $this->validate($request, $rules);

        $category = Category::create($request->all());

        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
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

        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->noContent();
    }
}
