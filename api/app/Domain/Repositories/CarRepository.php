<?php

namespace App\Domain\Repositories;

use App\Domain\Models\Car;

class CarRepository extends BaseRepository
{

    public function model(): string
    {
        return Car::class;
    }
}