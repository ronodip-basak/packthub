<?php

namespace App\Http\Resources\search;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $genres = [];
        foreach($this->genre as $genre){
            $genres[] = $genre->title;
        }

        $authors = [];
        foreach($this->author as $author){
            $authors[] = $author->title;
        }
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'isbn' => $this->isbn,
            'authors' => $authors,
            'genres' => $genres,
            'published_on' => $this->published_on
        ];
    }
}
