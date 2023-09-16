<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        return UserResource::collection(User::query()->paginate());
    }

    public function show(User $user) {
        return UserResource::make($user);
    }

    public function store(UserRequest $request) {
        return UserResource::make(User::query()->create($request->validated()));
    }

    public function update(User $user, UserUpdateRequest $request) {
        $user->update($request->validated());
        return UserResource::make($user);
    }

    public function destroy(User $user) {
        return response()->json(['success' => $user->delete()]);
    }
}
