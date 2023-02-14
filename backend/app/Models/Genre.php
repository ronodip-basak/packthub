<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function book() {
        return $this->belongsToMany('App\Models\Book', 'book_genre_pivot');
    }
}
