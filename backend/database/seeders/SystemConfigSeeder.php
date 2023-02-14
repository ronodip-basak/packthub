<?php

namespace Database\Seeders;

use App\Enums\SystemConfigEnum;
use App\Models\Book;
use App\Models\Genre;
use App\Models\SystemConfig;
use App\Service\SearchService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $featured_genres = Genre::withCount('book')->orderBy('book_count', 'desc')->limit(6)->pluck('id');
        SystemConfig::create([
            'key' => SystemConfigEnum::FEATURED_GENRE,
            'value' => json_encode($featured_genres)
        ]);

        $featured_books = Book::limit(12)->pluck('id');
        SystemConfig::create([
            'key' => SystemConfigEnum::FEATURED_BOOKS,
            'value' => json_encode($featured_books)
        ]);

        SystemConfig::create([
            'key' => SystemConfigEnum::SEARCH_API_KEY,
            'value' => SearchService::client()->createKey([
                'description' => 'Search Books key',
                'actions' => ['search'],
                'indexes' => ['books'],
                'expiresAt' => null
            ])->getKey()
        ]);
        
    }
}
