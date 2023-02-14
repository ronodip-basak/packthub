<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $guarded = [
        
    ];

    public function genre (){
        return $this->belongsToMany('App\Models\Genre', 'book_genre_pivot');
    }

    public function author(){
        return $this->belongsToMany("App\Models\Author", 'book_author_pivot');
    }
}
