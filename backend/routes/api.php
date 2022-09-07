<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UploadAvatar;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\LessonController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Public\ProfileController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\UserPrivilegeController;
use App\Http\Controllers\User\CategoryPrivilegeController;
use App\Http\Controllers\User\UserChangePasswordController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['admin', 'auth'])->group(function () {
    Route::apiResource('users', UserController::class, ['only' => ['index']]);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('questions', QuestionController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::apiResource('user-privilege', UserPrivilegeController::class, ['only' => ['index', 'show', 'update']]);
    Route::apiResource('user-change-password', UserChangePasswordController::class, ['only' => ['update']]);
    Route::apiResource('category-privilege', CategoryPrivilegeController::class, ['only' => ['index', 'show']]);
    Route::apiResource('follows', FollowController::class, ['only' => ['store', 'destroy']]);
    Route::apiResource('lessons', LessonController::class, ['only' => ['store', 'show']]);
    Route::apiResource('dashboards', DashboardController::class, ['only' => ['index']]);
    Route::apiResource('upload-avatar', UploadAvatar::class, ['only' => ['store']]);
});

Route::apiResource('profiles', ProfileController::class, ['only' => ['index', 'show']]);
