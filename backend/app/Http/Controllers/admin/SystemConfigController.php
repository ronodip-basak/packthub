<?php

namespace App\Http\Controllers\admin;

use App\Enums\SystemConfigEnum;
use App\Helpers\BookHelper;
use App\Helpers\SystemConfigHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\SystemConfigUpdateRequest;
use App\Models\SystemConfig;
use Illuminate\Http\Request;

class SystemConfigController extends Controller
{
    public function index(){
        return [
            SystemConfigEnum::FEATURED_BOOKS => (new BookHelper)->getFeaturedBooks(),
            SystemConfigEnum::FEATURED_GENRE => (new BookHelper)->getFeaturedGenre(),
            SystemConfigEnum::SEARCH_API_KEY => (new SystemConfigHelper)->get(SystemConfigEnum::SEARCH_API_KEY),
        ];
    }

    public function update(SystemConfigUpdateRequest $request){
        SystemConfig::whereIn('key', [SystemConfigEnum::FEATURED_BOOKS, SystemConfigEnum::FEATURED_GENRE])->delete();

        

        SystemConfig::create([
            'key' => SystemConfigEnum::FEATURED_BOOKS,
            'value' => json_encode($request->featured_books)
        ]);

        SystemConfig::create([
            'key' => SystemConfigEnum::FEATURED_GENRE,
            'value' => json_encode($request->featured_genre)
        ]);
        (new SystemConfigHelper)->invalidateCache();
        (new BookHelper)->invalidateCache();

        return [
            'success' => true
        ];

    }
}
