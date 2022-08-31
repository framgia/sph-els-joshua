<?php

namespace App\Http\Controllers\Admin;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionChoicesResource;
use App\Http\Resources\QuestionResource;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    use ApiResponser;

    public function index()
    {
        return QuestionResource::collection(Question::latest()->orderByDesc('id')->get());
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

        Choice::insert($newChoices);
        
        return new QuestionResource($newQuestion);
    }

    public function show(Question $question)
    {
        return new QuestionChoicesResource($question);
    }

    public function update(Request $request, Question $question)
    {
        $question->value = $request->input('value');
        $question->save();
        
        $this->updateChoices($request->input('choices'));

        return new QuestionResource($question);
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

    public function destroy(Question $question)
    {
        $question->delete();
        
        return response()->noContent();
    }
}
