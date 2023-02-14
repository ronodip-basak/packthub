<?php

namespace App\Http\Controllers\admin;

use App\Helpers\BookHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AuthorController extends Controller
{

    public function index(Request $request)
    {
        $query = Author::query();

        if ($request->search) {
            $query = $query->where('title', 'LIKE', $request->search . '%');
        }




        return AuthorResource::collection($request->disable_pagination ? $query->get() : $query->paginate($request->per_page ?? 10));
    }
    public function save(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'nullable|file|mimes:jpg,png,webp'
        ]);

        $author = new Author();
        $author->fill($request->only('title'));

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('author', 'public');
            $author->image = env('APP_URL') . "/storage/" . $image;
        }

        $author->save();

        return [
            'success' => true,
            'author' => $author
        ];
    }

    public function update(Author $author, Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'nullable|file|mimes:jpg,png,webp'
        ]);
        $author->title = $request->title;
        if ($request->hasFile('image')) {
            if ($author->image) {
                if (Storage::disk('public')->exists(str_replace(env('APP_URL') . "/storage/", "", $author->image))) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . "/storage/", "", $author->image));
                }
            }
            $author->image = env('APP_URL') . '/storage/' . $request->file('image')->store('author', 'public');
        }

        $author->save();

        $this->handleSearchDataUpdate($author->id);

        return [
            'success' => true
        ];
    }

    public function delete(Author $author)
    {
        $authorId = $author->id;
        $author->delete();
        $this->handleSearchDataUpdate($authorId);
        return [
            'success' => true
        ];
    }
    public function show(Author $author){
        return $author;
    }

    private function handleSearchDataUpdate($authorId){
        (new BookHelper)->updateSearchData(DB::table('book_author_pivot')->where('author_id', $authorId)->pluck('book_id'));
    }
}
