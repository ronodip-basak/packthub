<?php

namespace App\Http\Requests;

use App\Models\Author;
use App\Models\Genre;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class BookUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (Auth::guard('admins')->check()) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|min:2|max:255',
            'isbn' => 'required|numeric',
            'image' => 'nullable|file|mimes:jpg,png,webp',
            'description' => 'required|min:10|max:1000',
            'authors' => 'required|min:1|array',
            'genres' => 'required|min:1|array',
            'published_on' => 'required|date'
        ];
    }

        /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
    */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $author_ids = Request::input('authors');          

            if(count($author_ids) != Author::whereIn('id', $author_ids)->count()){
                $validator->errors()->add('authors', 'Authors are invalid');
            }

            $genre_ids = Request::input('genres');
            if(count($genre_ids) != Genre::whereIn('id', $genre_ids)->count()){
                $validator->errors()->add('genres', 'Genres are invalid');
            }
        });
    }
}
