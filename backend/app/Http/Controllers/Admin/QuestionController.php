<?php

namespace App\Http\Controllers\Admin;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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

        $temp = [];
        $newChoices = [];
        foreach($request->input('choices') as $item) 
        {
            $temp['question_id'] = $newQuestion->id;
            $temp['value'] = $item['value'];
            $newChoices[] = $temp;
        }

        $choiceResult = Choice::insert($newChoices);
        
        return response()->json([
            'results' => $choiceResult
        ]);
    }

    public function show(Question $question)
    {
        return response()->json([
            'category' => $question->category,
            'question' => $question,
            'choices' => $question->choices
        ], 201);
    }

    public function update(Request $request, Question $question)
    {
        $question->value = $request->input('value');
        $question->choice_id = $request->input('choice_id'); 
        $question->save();
        
        $this->updateChoices($request->input('choices'));

        return $this->showOne($question);
    }

    private function updateChoices(array $choices): void {
        $caseString = 'case id';
        $ids = '';
        foreach ($choices as $value) {
            $id = $value['id'];
            $displayIndex = $value['value'];
            $caseString .= " when $id then \"$displayIndex\"";
            $ids .= " $id,";
        }
        $ids = trim($ids, ',');

        DB::update("UPDATE choices SET value = $caseString END WHERE id IN ($ids)");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $choice)
    {
        return $this->showOne($choice);
    }
}
