<?php

namespace App\Http\Requests;

class UserCreateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'nome'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:usuarios',
            'password' => 'required|string|min:6',
        ];
    }
}
