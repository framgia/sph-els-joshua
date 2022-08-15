<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\LessonController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\User\UserPrivilegeController;
use App\Http\Controllers\User\CategoryPrivilegeController;
use App\Http\Controllers\User\UserChangePasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['admin', 'auth'])->group(function () {
    Route::resource('users', UserController::class, ['only' => ['index']]);
    Route::resource('categories', CategoryController::class);
    Route::resource('questions', QuestionController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('user-privilege', UserPrivilegeController::class, ['only' => ['index', 'show', 'update']]);
    Route::resource('user-change-password', UserChangePasswordController::class, ['only' => ['update']]);
    Route::resource('category-privilege', CategoryPrivilegeController::class, ['only' => ['index', 'show']]);
    Route::resource('follows', FollowController::class, ['only' => ['store', 'update']]);
    Route::resource('lessons', LessonController::class, ['only' => ['store', 'show']]);
});
