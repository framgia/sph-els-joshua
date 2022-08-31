<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionChoicesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'category' => [
                'id' => $this->category->id,
                'title' => $this->category->title
            ],
            'question' => [
                'id' => $this->id,
                'value' => $this->value,
                'category_id' => $this->category_id,
                'created_at' => $this->created_at
            ],
            'choices' => $this->choices
        ];
    }
}
