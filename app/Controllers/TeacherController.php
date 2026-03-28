<?php

namespace App\Controllers;

use App\Services\TeacherService;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class TeacherController extends BaseController
{
    public function __construct(private readonly TeacherService $teacherService = new TeacherService())
    {
    }

    public function index(): ResponseInterface
    {
        return $this->response->setJSON([
            'teachers' => $this->teacherService->getAllTeachers(),
        ]);
    }

    public function show(int $id): ResponseInterface
    {
        try {
            return $this->response->setJSON([
                'teacher' => $this->teacherService->getTeacherById($id),
            ]);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    public function create(): ResponseInterface
    {
        try {
            $teacher = $this->teacherService->createTeacher($this->request->getJSON(true) ?? []);

            return $this->response->setStatusCode(201)->setJSON([
                'message' => 'Teacher created successfully.',
                'teacher' => $teacher,
            ]);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    public function update(int $id): ResponseInterface
    {
        try {
            $teacher = $this->teacherService->updateTeacher($id, $this->request->getJSON(true) ?? []);

            return $this->response->setJSON([
                'message' => 'Teacher updated successfully.',
                'teacher' => $teacher,
            ]);
        } catch (Exception $exception) {
            return $this->handleException($exception);
        }
    }

    public function delete(int $id): ResponseInterface
    {
        try {
            $this->teacherService->deleteTeacher($id);

            return $this->response->setJSON([
                'message' => 'Teacher deleted successfully.',
            ]);
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
