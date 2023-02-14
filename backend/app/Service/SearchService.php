<?php

namespace App\Service;

use Meilisearch\Client;

class SearchService{
    static function client(){
        return new Client(env('MEILISEARCH_URL'), env('MEILISEARCH_MASTER_PASSWORD'));
    }
}