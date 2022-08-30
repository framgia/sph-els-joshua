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

    public function index()
    {
        $questions = Question::latest()
                        ->orderBy('id', 'desc')
                        ->get();

        return $this->showAll($questions);
    }

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
            $temp['is_correct'] = $item['is_correct'];
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
        $question->save();
        
        $this->updateChoices($request->input('choices'));

        return $this->showOne($question);
    }

    private function updateChoices(array $choices): void {
        $caseValue = 'case';
        $caseIsCorrect = 'case';
        $ids = '';
        foreach ($choices as $value) {
            $id = $value['id'];
            $displayValue = $value['value'];
            $displayIsCorrect = $value['is_correct'] == 0 ? 0 : 1;
            $caseValue .= " when id = $id then \"$displayValue\"";
            $caseIsCorrect .= " when id = $id then $displayIsCorrect";
            $ids .= " $id,";
        }
        $ids = trim($ids, ',');
        DB::update("UPDATE choices SET value = $caseValue END, is_correct = $caseIsCorrect END WHERE id IN ($ids)");
    }

    public function edit(Question $choice)
    {
        return $this->showOne($choice);
    }

    public function destroy(Question $question)
    {
        $question->delete();
        
        return $this->showOne($question);
    }
}
