<?php

namespace App\Domain\Repositories;

use App\Domain\Models\Usuario;

class UsuarioRepository extends BaseRepository
{
    public function model(): string
    {
        return Usuario::class;
    }
}