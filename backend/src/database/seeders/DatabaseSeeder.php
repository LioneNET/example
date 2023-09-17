<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $data = File::json(storage_path('app/public/test.json'))['posts'];
         Article::query()->insert(array_map(fn ($v) => ['name' => $v['name']], $data));
    }
}
