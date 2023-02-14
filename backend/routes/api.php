<?php

use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', ['App\Http\Controllers\AuthController', 'login']);

Route::post('/logout', ['App\Http\Controllers\AuthController', 'logout']);


Route::get('/index', ['App\Http\Controllers\HomeController', 'index']);

// Route::middleware('admin')->prefix('/admin')->group(function() {
Route::middleware('admin')->prefix('/admin')->group(function () {

    Route::get('/dashboard', ['App\Http\Controllers\admin\IndexController', 'index']);

    Route::prefix('/book')->group(function () {
        Route::post('/', ['App\Http\Controllers\admin\BookController', 'store']);
        Route::get('/', ['App\Http\Controllers\admin\BookController', 'index']);
        Route::delete('/{book}', ['App\Http\Controllers\admin\BookController', 'delete']);
        Route::get('/{book}', ['App\Http\Controllers\admin\BookController', 'show']);
        Route::put('/{book}', ['App\Http\Controllers\admin\BookController', 'update']);
    });

    Route::prefix('/author')->group(function () {
        Route::get('/', ['App\Http\Controllers\admin\AuthorController', 'index']);
        Route::post('/', ['App\Http\Controllers\admin\AuthorController', 'save']);
        Route::delete('/{author}', ['App\Http\Controllers\admin\AuthorController', 'delete']);
        Route::put('/{author}', ['App\Http\Controllers\admin\AuthorController', 'update']);
        Route::get('/{author}', ['App\Http\Controllers\admin\AuthorController', 'show']);

    });

    Route::prefix('/genre')->group(function () {
        Route::get('/', ['App\Http\Controllers\admin\GenreController', 'index']);
        Route::post('/', ['App\Http\Controllers\admin\GenreController', 'save']);
        Route::delete('/{genre}', ['App\Http\Controllers\admin\GenreController', 'delete']);
        Route::put('/{genre}', ['App\Http\Controllers\admin\GenreController', 'update']);
        Route::get('/{genre}', ['App\Http\Controllers\admin\GenreController', 'show']);
    });



    Route::get('/system_config', ['App\Http\Controllers\admin\SystemConfigController', 'index']);
    Route::post('/system_config/update', ['App\Http\Controllers\admin\SystemConfigController', 'update']);

    Route::get('/check', function () {
        return [
            'success' => true,
            'admin' => new AdminResource(Auth::guard('admins')->user())
        ];
    });
});
