<?php

namespace Tests\Feature;

use App\Domain\Models\Usuario;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\CreatesApplication;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use DatabaseMigrations;
    use CreatesApplication;
    use DatabaseTransactions;
    use WithFaker;

    /**
     * A basic feature test example.
     */
    public function test_should_be_login_take_access_token(): void
    {
        /* @var Usuario $user */
        $user = Usuario::factory()->create(['password' => '123456']);

        $credentials = [
            'email'    => $user->email,
            'password' => '123456',
        ];

        $response = $this->post('/api/auth/login', $credentials)->json();

        $this->assertEquals($user->nome, $response['user']['nome']);

        $this->assertEquals('success', $response['status']);

        $this->assertArrayHasKey('token', $response['authorization']);

    }

    public function test_should_be_register_user(): void
    {
        $user = [
            'nome'     => $this->faker->name(),
            'email'    => $this->faker->email(),
            'password' => $this->faker->password(),
        ];

        $response = $this->post('/api/auth/register', $user)->json();

        $this->assertEquals($user['nome'], $response['user']['nome']);

        $this->assertEquals($user['email'], $response['user']['email']);

        $this->assertEquals('success', $response['status']);
    }
}
