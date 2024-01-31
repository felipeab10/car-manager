<?php

namespace App\Http\Requests;

use Symfony\Component\HttpFoundation\Response;

class LoginRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ];
    }
}
