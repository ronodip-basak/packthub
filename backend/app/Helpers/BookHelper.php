<?php

namespace App\Helpers;

use App\Enums\CacheEnum;
use App\Enums\SystemConfigEnum;
use App\Http\Resources\search\BookResource;
use App\Models\Book;
use App\Models\Genre;
use App\Service\SearchService;
use Illuminate\Support\Facades\Cache;

class BookHelper
{
    public function getFeaturedBooks()
    {
        if (
            !Cache::has(CacheEnum::FEATURED_BOOKS)
        ) {
            $featured_books_ids = (new SystemConfigHelper())->get(SystemConfigEnum::FEATURED_BOOKS);

            $featured_books = Book::whereIn('id', $featured_books_ids)->with('genre')->with('author')->get();
            Cache::put(CacheEnum::FEATURED_BOOKS, $featured_books, now()->addDay());
        }

        return Cache::get(CacheEnum::FEATURED_BOOKS);
    }

    public function getFeaturedGenre()
    {
        if (!Cache::has(CacheEnum::FEATURED_GENRE)) {
            $featured_genre_ids = (new SystemConfigHelper())->get(SystemConfigEnum::FEATURED_GENRE);
            $featured_genres = Genre::whereIn('id', $featured_genre_ids)->with(['book.author', 'book.genre'])->get();
            Cache::put(CacheEnum::FEATURED_GENRE, $featured_genres, now()->addDay());
        }

        return Cache::get(CacheEnum::FEATURED_GENRE);
    }

    public function invalidateCache(){
        Cache::forget(CacheEnum::FEATURED_GENRE);
        Cache::forget(CacheEnum::FEATURED_BOOKS);
    }

    public function updateSearchData($book_ids){
        $books = Book::whereIn('id', $book_ids)->with(['author', 'genre'])->get();

        $searchData = [];
        foreach ($books as $book) {
            $searchData[] = json_decode((new BookResource($book))->toJson(), true);
        }
        
        SearchService::client()->index('books')->updateDocuments($searchData);
    }
}
