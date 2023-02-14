<?php

namespace Database\Seeders;

use App\Http\Resources\search\BookResource;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Service\SearchService;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            $response = Http::acceptJson()->get('https://fakerapi.it/api/v1/books?_quantity=500')->throw()->json();
        } catch (\Throwable $th) {
            print("Uanble to complete HTTP Request. Check your internet connection");
            throw $th;
        }


        if ($response['code'] != 200) {
            throw new \Exception("Received NON OK status from fakerapi.it");
        }
        // dd($response);

        // We'll use this maps to save some queries later
        $genreMap = [];
        $authorMap = [];

        // We'll use these data to push pivot data in single query
        $authorPivotData = [];
        $genrePivotData = [];


        foreach ($response['data'] as $bookData) {

            //Create Book
            $book = Book::create([
                'title' => $bookData['title'],
                'isbn' => $bookData['isbn'],
                'image' => $bookData['image'],
                'published_on' => Carbon::parse($bookData['published']),
                'description' => $bookData['description']
            ]);

            if (!@$genreMap[$bookData['genre']]) {
                // Genre does not exist
                $genre = Genre::create([
                    'title' => $bookData['genre']
                ]);

                $genreMap[$bookData['genre']] = $genre->id;

                $applicable_genre_id = $genre->id;
            } else {
                $applicable_genre_id = $genreMap[$bookData['genre']];
            }

            //Update genere Pivot Data. 
            $genrePivotData[] = [
                'book_id' => $book->id,
                'genre_id' => $applicable_genre_id,
                'created_at' => now(),
                'updated_at' => now()
            ];

            if (!@$authorMap[$bookData['author']]) {
                // Author does not exists. Need to create one
                $author = Author::create([
                    'title' => $bookData['author']
                ]);

                $authorMap[$bookData['author']] = $author->id;

                $applicable_author_id = $author->id;
            } else {
                $applicable_author_id = $authorMap[$bookData['author']];
            }

            $authorPivotData[] = [
                'author_id' => $applicable_author_id,
                'book_id' => $book->id,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        DB::table('book_author_pivot')->insert($authorPivotData);
        DB::table('book_genre_pivot')->insert($genrePivotData);

        $books = Book::with(['author', 'genre'])->get();

        $searchData = [];

        foreach ($books as $book) {
            $searchData[] = json_decode((new BookResource($book))->toJson(), true);
        }

        SearchService::client()->index('books')->addDocuments($searchData);
        SearchService::client()->index('books')->updateFilterableAttributes(['authors', 'genres']);
    }
}
