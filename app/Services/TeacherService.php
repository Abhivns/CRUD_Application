<?php

namespace App\Services;

use App\Exceptions\ApiException;
use App\Models\TeacherModel;
use App\Models\UserModel;
use Config\Database;

class TeacherService
{
    public function __construct(
        private readonly TeacherModel $teacherModel = new TeacherModel(),
        private readonly UserModel $userModel = new UserModel()
    ) {
    }

    public function getAllTeachers(): array
    {
        return $this->teacherQuery()
            ->orderBy('teachers.id', 'DESC')
            ->findAll();
    }

    public function getTeacherById(int $id): array
    {
        $teacher = $this->teacherQuery()->where('teachers.id', $id)->first();

        if (! $teacher) {
            throw new ApiException('Teacher not found.', 404);
        }

        return $teacher;
    }

    public function createTeacher(array $payload): array
    {
        $this->validateTeacherPayload($payload);

        $db = Database::connect();
        $db->transStart();

        $userId = $this->userModel->insert([
            'email'      => strtolower(trim($payload['email'])),
            'first_name' => trim($payload['first_name']),
            'last_name'  => trim($payload['last_name']),
            'password'   => password_hash($payload['password'], PASSWORD_BCRYPT),
        ], true);

        $teacherId = $this->teacherModel->insert([
            'user_id'         => $userId,
            'university_name' => trim($payload['university_name']),
            'gender'          => $payload['gender'],
            'year_joined'     => (int) $payload['year_joined'],
            'department'      => trim($payload['department'] ?? ''),
            'phone_number'    => trim($payload['phone_number'] ?? ''),
        ], true);

        $db->transComplete();

        if (! $db->transStatus()) {
            throw new ApiException('Unable to create teacher right now.', 500);
        }

        return $this->getTeacherById($teacherId);
    }

    public function updateTeacher(int $id, array $payload): array
    {
        $teacher = $this->teacherModel->find($id);

        if (! $teacher) {
            throw new ApiException('Teacher not found.', 404);
        }

        $this->validateTeacherPayload($payload, (int) $teacher['user_id']);

        $userData = [
            'email'      => strtolower(trim($payload['email'])),
            'first_name' => trim($payload['first_name']),
            'last_name'  => trim($payload['last_name']),
        ];

        if (! empty($payload['password'])) {
            $userData['password'] = password_hash($payload['password'], PASSWORD_BCRYPT);
        }

        $db = Database::connect();
        $db->transStart();

        $this->userModel->update($teacher['user_id'], $userData);
        $this->teacherModel->update($id, [
            'university_name' => trim($payload['university_name']),
            'gender'          => $payload['gender'],
            'year_joined'     => (int) $payload['year_joined'],
            'department'      => trim($payload['department'] ?? ''),
            'phone_number'    => trim($payload['phone_number'] ?? ''),
        ]);

        $db->transComplete();

        if (! $db->transStatus()) {
            throw new ApiException('Unable to update teacher right now.', 500);
        }

        return $this->getTeacherById($id);
    }

    public function deleteTeacher(int $id): void
    {
        $teacher = $this->teacherModel->find($id);

        if (! $teacher) {
            throw new ApiException('Teacher not found.', 404);
        }

        $db = Database::connect();
        $db->transStart();
        $this->userModel->delete($teacher['user_id']);
        $db->transComplete();

        if (! $db->transStatus()) {
            throw new ApiException('Unable to delete teacher right now.', 500);
        }
    }

    private function teacherQuery(): TeacherModel
    {
        return $this->teacherModel
            ->select('teachers.id, teachers.user_id, auth_user.email, auth_user.first_name, auth_user.last_name, auth_user.created_at, teachers.university_name, teachers.gender, teachers.year_joined, teachers.department, teachers.phone_number')
            ->join('auth_user', 'auth_user.id = teachers.user_id');
    }

    private function validateTeacherPayload(array $payload, ?int $ignoreUserId = null): void
    {
        $validation = service('validation');
        $validation->setRules([
            'email'           => 'required|valid_email',
            'first_name'      => 'required|min_length[2]|max_length[100]',
            'last_name'       => 'required|min_length[2]|max_length[100]',
            'password'        => $ignoreUserId === null
                ? 'required|min_length[6]|max_length[255]'
                : 'permit_empty|min_length[6]|max_length[255]',
            'university_name' => 'required|min_length[2]|max_length[255]',
            'gender'          => 'required|in_list[male,female,other]',
            'year_joined'     => 'required|integer|greater_than_equal_to[1900]|less_than_equal_to[2100]',
            'department'      => 'permit_empty|max_length[150]',
            'phone_number'    => 'permit_empty|max_length[20]',
        ]);

        if (! $validation->run($payload)) {
            throw new ApiException(implode(' ', $validation->getErrors()), 422);
        }

        $existingUser = $this->userModel
            ->where('email', strtolower(trim($payload['email'])))
            ->first();

        if ($existingUser && (int) $existingUser['id'] !== $ignoreUserId) {
            throw new ApiException('The email address is already in use.', 422);
        }
    }
}
