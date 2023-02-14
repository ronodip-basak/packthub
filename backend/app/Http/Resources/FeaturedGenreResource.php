<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeaturedGenreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this['book']);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image' => $this->image,
            'books' => BookPublicResource::collection($this->book)
        ];
    }
}
