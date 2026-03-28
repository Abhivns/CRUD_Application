<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'auth_user';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'email',
        'first_name',
        'last_name',
        'password',
        'created_at',
    ];

    protected $beforeInsert = ['setCreatedAt'];

    protected function setCreatedAt(array $data): array
    {
        $data['data']['created_at'] = date('Y-m-d H:i:s');

        return $data;
    }
}
