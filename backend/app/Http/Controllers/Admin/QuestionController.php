<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'category_id' => 'required',
            'value' => 'required'
        ];

        $this->validate($request, $rules);

        $newQuestion = Question::create($request->all())
                            ->each(function ($question) {
                                Choice::create(['question_id' => $question->id]);
                            });

        return $this->showOne($newQuestion, 201);
    }
}
