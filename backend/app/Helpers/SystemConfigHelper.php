<?php

namespace App\Helpers;

use App\Enums\CacheEnum;
use App\Enums\SystemConfigEnum;
use App\Models\SystemConfig;
use Illuminate\Support\Facades\Cache;

class SystemConfigHelper
{
    private function getAllSystemConfig()
    {
        if (!Cache::has(CacheEnum::SYSTEM_CONFIG)) {
            $systemConfig = [];
            $dbSystemConfig = SystemConfig::all();
            foreach ($dbSystemConfig as $config) {
                if ($config->key == SystemConfigEnum::FEATURED_BOOKS) {
                    $systemConfig[SystemConfigEnum::FEATURED_BOOKS] = json_decode($config->value, true);
                }

                if ($config->key == SystemConfigEnum::FEATURED_GENRE) {
                    $systemConfig[SystemConfigEnum::FEATURED_GENRE] = json_decode($config->value, true);
                }
                if ($config->key == SystemConfigEnum::SEARCH_API_KEY) {
                    $systemConfig[SystemConfigEnum::SEARCH_API_KEY] = $config->value;
                }
            }

            Cache::put(CacheEnum::SYSTEM_CONFIG, $systemConfig, now()->addDay());
        }

        return Cache::get(CacheEnum::SYSTEM_CONFIG);
    }

    public function get($key)
    {
        if (
            $key != SystemConfigEnum::FEATURED_BOOKS &&
            $key != SystemConfigEnum::FEATURED_GENRE &&
            $key != SystemConfigEnum::SEARCH_API_KEY
        ) {
            throw new \Exception("Invalid System Config Key Used");
        }
        return $this->getAllSystemConfig()[$key];
    }

    public function invalidateCache(){
        Cache::forget(CacheEnum::SYSTEM_CONFIG);
    }
}
