<?php

namespace App\Domain\Services;

use App\Domain\Repositories\CarRepository;
use Illuminate\Http\Request;

class CarService
{
        public function __construct(private readonly CarRepository $carRepository) {}

    public function Create(array $attributes)
    {
       dd($attributes);
    }
}