<?php

namespace App\Http\Controllers;

use App\Domain\Services\CarService;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function __construct(private readonly CarService $carService) {}

    public function create(Request $request)
    {
        $attributes = $request->only(['nome','marca','modelo','ano']);

        $this->carService->Create($attributes);
    }
}
