<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('id', 'desc');
    }

    public function activity_logs()
    {
        return $this->hasMany(ActivityLog::class)->orderBy('id', 'desc');
    }

    public function following() {
        return $this->belongsToMany(User::class, 'user_relationships', 'follower_id', 'following_id');
    }
    
    public function followers() {
        return $this->belongsToMany(User::class, 'user_relationships', 'following_id', 'follower_id');
    }
}
