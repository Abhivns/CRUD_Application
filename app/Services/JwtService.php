<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JwtService
{
    private string $key;

    public function __construct()
    {
        $this->key = getenv('JWT_SECRET') ?: 'change-me-in-env';
    }

    public function generateToken(array $user): string
    {
        $payload = [
            'iat'  => time(),
            'exp'  => time() + 3600 * 8,
            'data' => [
                'id'    => $user['id'],
                'email' => $user['email'],
            ],
        ];

        return JWT::encode($payload, $this->key, 'HS256');
    }

    public function decodeToken(string $token): stdClass
    {
        return JWT::decode($token, new Key($this->key, 'HS256'));
    }
}
