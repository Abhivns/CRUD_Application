<?php

namespace App\Services;

use App\Exceptions\ApiException;
use App\Models\UserModel;

class AuthService
{
    public function __construct(
        private readonly UserModel $userModel = new UserModel(),
        private readonly JwtService $jwtService = new JwtService()
    ) {
    }

    public function register(array $payload): array
    {
        $validation = service('validation');
        $validation->setRules([
            'email'      => 'required|valid_email|is_unique[auth_user.email]',
            'first_name' => 'required|min_length[2]|max_length[100]',
            'last_name'  => 'required|min_length[2]|max_length[100]',
            'password'   => 'required|min_length[6]|max_length[255]',
        ]);

        if (! $validation->run($payload)) {
            throw new ApiException(implode(' ', $validation->getErrors()), 422);
        }

        $userId = $this->userModel->insert([
            'email'      => strtolower(trim($payload['email'])),
            'first_name' => trim($payload['first_name']),
            'last_name'  => trim($payload['last_name']),
            'password'   => password_hash($payload['password'], PASSWORD_BCRYPT),
        ], true);

        $user = $this->userModel->find($userId);

        return [
            'message' => 'User registered successfully.',
            'token'   => $this->jwtService->generateToken($user),
            'user'    => $this->sanitizeUser($user),
        ];
    }

    public function login(array $payload): array
    {
        $validation = service('validation');
        $validation->setRules([
            'email'    => 'required|valid_email',
            'password' => 'required',
        ]);

        if (! $validation->run($payload)) {
            throw new ApiException(implode(' ', $validation->getErrors()), 422);
        }

        $user = $this->userModel
            ->where('email', strtolower(trim($payload['email'])))
            ->first();

        if (! $user || ! password_verify($payload['password'], $user['password'])) {
            throw new ApiException('Invalid email or password.', 401);
        }

        return [
            'message' => 'Login successful.',
            'token'   => $this->jwtService->generateToken($user),
            'user'    => $this->sanitizeUser($user),
        ];
    }

    public function getAuthenticatedUserFromToken(string $token): array
    {
        $payload = $this->jwtService->decodeToken($token);
        $userId = $payload->data->id ?? null;
        $user = $this->userModel->find($userId);

        if (! $user) {
            throw new ApiException('User not found.', 404);
        }

        return $this->sanitizeUser($user);
    }

    private function sanitizeUser(array $user): array
    {
        unset($user['password']);

        return $user;
    }
}
