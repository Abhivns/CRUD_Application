<?php

namespace App\Filters;

use App\Services\JwtService;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine('Authorization');

        if (! $header || stripos($header, 'Bearer ') !== 0) {
            return service('response')->setStatusCode(401)->setJSON([
                'message' => 'Authorization token is required.',
            ]);
        }

        try {
            $token = trim(substr($header, 7));
            (new JwtService())->decodeToken($token);
        } catch (Exception) {
            return service('response')->setStatusCode(401)->setJSON([
                'message' => 'Invalid or expired token.',
            ]);
        }

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return null;
    }
}
