<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'store'])
                ->middleware('guest')
                ->name('register');

Route::post('/login', [AuthController::class, 'store'])
                ->middleware('guest')
                ->name('login');

Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [PasswordController::class, 'resetPassword'])
                ->middleware('guest')
                ->name('password.update');

Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, '__invoke'])
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');
