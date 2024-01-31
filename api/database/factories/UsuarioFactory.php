<?php

namespace Database\Factories;

use App\Domain\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Usuario>
 */
class UsuarioFactory extends Factory
{
    protected $model = Usuario::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome'     => $this->faker->name(),
            'email'    => $this->faker->email(),
            'password' => $this->faker->password(minLength:6)
        ];
    }
}
