<?php

use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $following_user = User::find(6)->following;

    $ids = [];
    foreach($following_user as $user)
    {
        $ids[] = $user->id;
    }
    array_push($ids, 6);

    $user_activities = ActivityLog::whereIn('user_id', $ids)->orderBy('created_at', 'desc')->get();

    foreach($user_activities as $activity)
    {
        $name = User::find($activity->user_id)->name;

        if ($activity['activity_type'] === 'Follow')
        {
            $name .= ' followed ' . User::find($activity->activity_id)->name;
        }
        if ($activity['activity_type'] === 'Lesson')
        {
            $name .= ' learned ' . Category::find($activity->activity_id)->title;
        }
        dump($name);
    }

    // return 
});

require __DIR__.'/auth.php';
