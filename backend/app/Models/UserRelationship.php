<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRelationship extends Model
{
    use HasFactory;

    protected $fillable = [
        'follower_id',
        'following_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
