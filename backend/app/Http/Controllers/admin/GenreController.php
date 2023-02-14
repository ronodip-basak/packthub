<?php

namespace App\Http\Controllers\admin;

use App\Helpers\BookHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenreResource;
use App\Http\Resources\search\BookResource;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GenreController extends Controller
{
    public function index(Request $request){
        $query = Genre::query();

        if($request->search){
            $query = $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        
         

        return GenreResource::collection($request->disable_pagination ? $query->get() : $query->paginate($request->per_page ?? 10));
        
    }
    public function save(Request $request){
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'nullable|file|mimes:jpg,png,webp'
        ]);

        $genre = new Genre();
        $genre->fill($request->only('title'));

        if($request->hasFile('image')){
            $image = $request->file('image')->store('genre', 'public');
            $genre->image = env('APP_URL') . "/storage/" . $image;
        }

        $genre->save();

        return [
            'success' => true,
            'genre' => $genre
        ];
    }

    public function delete(Genre $genre){
        $genreId = $genre->id;
        $genre->delete();

        $this->handleSearchDataUpdate($genreId);
        return [
            'success' => true
        ];
    }

    public function update(Genre $genre, Request $request){
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'nullable|file|mimes:jpg,png,webp'
        ]);
        $genre->title = $request->title;
        if($request->hasFile('image')){
            if($genre->image){
                if(Storage::disk('public')->exists(str_replace(env('APP_URL') . "/storage/", "", $genre->image))){
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . "/storage/", "", $genre->image));
                }
            }
            $genre->image = env('APP_URL') . '/storage/' . $request->file('image')->store('genre', 'public');
        }

        $genre->save();

        $this->handleSearchDataUpdate($genre->id);
        return [
            'success' => true
        ];
    }


    public function show(Genre $genre){
        return $genre;
    }

    private function handleSearchDataUpdate($genreId){
        (new BookHelper)->updateSearchData(DB::table('book_genre_pivot')->where('genre_id', $genreId)->pluck('book_id'));
    }
}
