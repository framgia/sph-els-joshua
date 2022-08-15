<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id', 'question_id', 
        'choice_id', 'is_correct'
    ];

    public function lessons()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
