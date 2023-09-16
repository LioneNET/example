<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleListRequest;
use App\Http\Requests\ArticleRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index(ArticleListRequest $request) {
        return ArticleResource::collection(Article::query()
            ->when(!empty($request->validated()), fn ($q) => $q->where('name', 'like', "%$request->name%"))
            ->orderBy('updated_at', 'desc')
            ->paginate());
    }

    public function show(Article $article) {
        return ArticleResource::make($article);
    }

    public function store(ArticleRequest $request) {
        return ArticleResource::make(Article::query()->create($request->validated()));
    }

    public function update(Article $article, ArticleUpdateRequest $request) {
        $article->update($request->validated());
        return ArticleResource::make($article);
    }

    public function destroy(Article $article) {
        return response()->json(['success' => $article->delete()]);
    }
}
