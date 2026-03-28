<<<<<<< HEAD
# Teacher CRUD Application

Full-stack CRUD web application built with CodeIgniter, MySQL, ReactJS, and JWT authentication.

## Tech Stack

- Backend: CodeIgniter 4 / PHP 8.1
- Database: MySQL
- Frontend: ReactJS with hooks
- Authentication: JWT token-based auth

## Project Structure

```text
backend/
├── app/
│   ├── Config/
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   └── TeacherController.php
│   ├── Database/
│   │   └── Migrations/
│   ├── Exceptions/
│   │   └── ApiException.php
│   ├── Filters/
│   │   └── AuthFilter.php
│   ├── Models/
│   │   ├── TeacherModel.php
│   │   └── UserModel.php
│   └── Services/
│       ├── AuthService.php
│       ├── JwtService.php
│       └── TeacherService.php
├── database_schema.sql
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        └── utils/
```

## Database Schema

SQL schema is included in [database_schema.sql](C:\Users\Vivek\backend\database_schema.sql).

Tables:

- `auth_user`
- `teachers`

Relationship:

- `teachers.user_id` -> `auth_user.id` (1-to-1)

## API Endpoints

Public:

- `POST /api/register`
- `POST /api/login`

Protected:

- `GET /api/profile`
- `GET /api/teachers`
- `GET /api/teachers/{id}`
- `POST /api/teachers`
- `PUT /api/teachers/{id}`
- `DELETE /api/teachers/{id}`

## Run Locally

### Backend

1. Configure database settings in [C:\Users\Vivek\backend\.env](C:\Users\Vivek\backend\.env)
2. Run migrations:

```bash
php spark migrate
```

3. Start the CodeIgniter server:

```bash
php spark serve
```

Backend runs at `http://localhost:8080`

### Frontend

1. Move to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

Frontend runs at `http://localhost:3000`

If needed, set `REACT_APP_API_URL=http://localhost:8080/api`.

## Features

- Register and login with hashed passwords
- JWT returned on successful auth
- Route and API protection using token validation
- Create teacher with combined `auth_user` + `teachers` insert
- View all teachers with joined user data
- Edit teacher and user data together
- Delete teacher and related user
- Separate React pages for login, register, dashboard, teacher list, and add/edit teacher

## Verification

Frontend:

- `npm run build`
- `npm test -- --watchAll=false --runInBand`

Backend:

- `php spark migrate`
- `php spark routes`
- `php -l` on updated PHP files
=======
# CRUD_Application
Full-stack CRUD application built with CodeIgniter (PHP) and ReactJS. Implements JWT-based authentication, protected REST APIs, and a one-to-one relational database (auth_user ↔ teachers). Supports secure login/register and complete CRUD operations with structured MVC architecture.
>>>>>>> f6cdd8a0266da25e94b581947ac23e8eb746bffa
