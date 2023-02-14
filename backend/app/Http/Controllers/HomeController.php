<?php

namespace App\Http\Controllers;

use App\Enums\CacheEnum;
use App\Enums\SystemConfigEnum;
use App\Helpers\BookHelper;
use App\Helpers\SystemConfigHelper;
use App\Http\Resources\BookPublicResource;
use App\Http\Resources\FeaturedGenreResource;
use App\Models\Genre;
use App\Models\SystemConfig;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){

        return [
            'featured_genres' => FeaturedGenreResource::collection((new BookHelper())->getFeaturedGenre()),
            'featured_books' => BookPublicResource::collection((new BookHelper())->getFeaturedBooks()),
            'search_api_key' => (new SystemConfigHelper)->get(SystemConfigEnum::SEARCH_API_KEY)
        ];
    }
}
