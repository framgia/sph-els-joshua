<?php

namespace App\Http\Controllers\Admin;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
{
    use ApiResponser;
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Question::all();
        return $this->showAll($questions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $categoryRules = [
            'category_id' => 'required',
            'value' => 'required'
        ];

        $this->validate($request, $categoryRules);

        $newQuestion = Question::create($request->all());

        $newChoices[] = '';
        $choices = $request->input('choices');
        foreach($choices as $item) 
        {
            $newChoices = Choice::create([
                'question_id' => $newQuestion->id,
                'value' => $item['value']
            ]);
            $newChoices->save();
        }
        
        return $this->showOne($newQuestion, 201);
    }
}
