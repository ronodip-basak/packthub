<?php

namespace App\Http\Controllers\admin;

use App\Enums\CacheEnum;
use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class IndexController extends Controller
{
    public function index(){
        if(!Cache::has(CacheEnum::DASHBOARD_DATA)){
            $data = [];

            $data['book_count'] = Book::count();
            $data['author_count'] = Author::count();
            $data['genre_count'] = Genre::count();

            Cache::put(CacheEnum::DASHBOARD_DATA, $data, now()->addMinutes(30));
        }

        return [
            'success' => true,
            'data' => Cache::get(CacheEnum::DASHBOARD_DATA)
        ];
    }
}
