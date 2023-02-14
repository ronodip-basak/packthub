<?php

namespace App\Http\Controllers\admin;

use App\Helpers\BookHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookStoreRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Resources\BookResource;
use App\Http\Resources\search\BookResource as SearchBookResource;
use App\Models\Book;
use App\Service\SearchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function store(BookStoreRequest $request)
    {
        $book = new Book();

        $book->fill($request->only('title', 'description', 'isbn', 'published_on'));

        $book->image = env('APP_URL') . '/storage/' . $request->file('image')->store('books', 'public');

        $book->save();
        $book->genre()->attach($request->genres);
        $book->author()->attach($request->authors);

        $this->handleSearchDataUpdate($book->id);

        return [
            'success' => true
        ];
    }

    public function index(Request $request)
    {
        $books = Book::query();

        $books = $books->with(['author', 'genre']);

        if ($request->search) {
            $books = $books->where('title', "LIKE", "%" . $request->search . "%");
        }

        if ($request->genres && count($request->genres) > 0) {
            $books = $books->whereIn('id', DB::table('book_genre_pivot')->whereIn('genre_id', $request->genres)->pluck('book_id'));
        }

        if ($request->authors && count($request->authors) > 0) {
            $books->whereIn('id', DB::table('book_author_pivot')->whereIn('author_id', $request->authors)->pluck('book_id'));
        }


        return BookResource::collection($request->disable_pagination ? $books->get() : $books->paginate($request->per_page ?? 10));
    }

    public function delete(Book $book)
    {
        $bookId = $book->id;
        $book->delete();

        $this->handleSearchDataUpdate($bookId);
        return [
            'success' => true
        ];
    }

    public function show(Book $book)
    {
        return new BookResource($book);
    }

    public function update(Book $book, BookUpdateRequest $request)
    {
        $book->fill($request->only('title', 'description', 'isbn', 'published_on'));

        if ($request->hasFile('image')) {
            if (Storage::disk('public')->exists(str_replace(env('APP_URL') . "/storage/", "", $book->image))) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . "/storage/", "", $book->image));
            }

            $book->image = env('APP_URL') . '/storage/' . $request->file('image')->store('books', 'public');
        }

        $book->save();
        $book->genre()->sync($request->genres);
        $book->author()->sync($request->authors);

        $this->handleSearchDataUpdate($book->id);

        return [
            'success' => true
        ];
    }

    private function handleSearchDataUpdate($bookId)
    {
        (new BookHelper)->updateSearchData([$bookId]);
    }
}
