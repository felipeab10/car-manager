<?php

namespace App\Domain\Services;

use App\Domain\Repositories\UsuarioRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(private readonly UsuarioRepository $usuarioRepository) {}

    public function attemptLogin(array $credentials): JsonResponse
    {
        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return response()->json([
                                        'status'  => 'error',
                                        'message' => 'Unauthorized',
                                    ],
                                    401
            );
        }

        $user = Auth::guard('api')->user();

        return response()->json([
                                    'status'        => 'success',
                                    'user'          => $user,
                                    'authorization' => [
                                        'token' => $token,
                                        'type'  => 'bearer',
                                    ]
                                ]);
    }

    public function create(array $attributes): JsonResponse
    {
        $user = $this->usuarioRepository->query()->create([
                                                              'nome'     => $attributes['nome'],
                                                              'email'    => $attributes['email'],
                                                              'password' => Hash::make($attributes['password']),
                                                          ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
                                    'status'        => 'success',
                                    'message'       => 'Usuário criado com sucesso!',
                                    'user'          => $user,
                                    'authorization' => [
                                        'token' => $token,
                                        'type'  => 'bearer',
                                    ]
                                ]);
    }

    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();

        return response()->json([
                                    'status'  => 'success',
                                    'message' => 'Usuário deslogado com sucesso!',
                                ]);
    }

    public function refreshToken(): JsonResponse
    {
        return response()->json([
                                    'status'        => 'success',
                                    'user'          => Auth::guard('api')->user(),
                                    'authorization' => [
                                        'token' => Auth::guard('api')->refresh(),
                                        'type'  => 'bearer',
                                    ]
                                ]);
    }
}