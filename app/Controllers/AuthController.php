<?php

namespace App\Controllers;

use App\Services\AuthService;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class AuthController extends BaseController
{
    public function __construct(private readonly AuthService $authService = new AuthService())
    {
    }

    public function register(): ResponseInterface
    {
        try {
            $result = $this->authService->register($this->request->getJSON(true) ?? []);

            return $this->response->setStatusCode(201)->setJSON($result);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    public function login(): ResponseInterface
    {
        try {
            $result = $this->authService->login($this->request->getJSON(true) ?? []);

            return $this->response->setJSON($result);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    public function profile(): ResponseInterface
    {
        try {
            $token = trim(str_ireplace('Bearer', '', $this->request->getHeaderLine('Authorization')));
            $user = $this->authService->getAuthenticatedUserFromToken($token);

            return $this->response->setJSON(['user' => $user]);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    private function handleException(Exception $exception): ResponseInterface
    {
        $statusCode = method_exists($exception, 'getCode') && $exception->getCode() >= 400
            ? $exception->getCode()
            : 500;

        return $this->response->setStatusCode($statusCode)->setJSON([
            'message' => $exception->getMessage(),
        ]);
    }
}
