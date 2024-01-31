<?php

namespace App\Http\Controllers;

use App\Domain\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserCreateRequest;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        return $this->authService->attemptLogin(credentials:$credentials);
    }

    public function register(UserCreateRequest $request): JsonResponse
    {
        return $this->authService->create(attributes:$request->all());

    }

    public function logout(): JsonResponse
    {
        return $this->authService->logout();
    }


    public function refresh(): JsonResponse
    {
        return $this->authService->refreshToken();
    }
}
