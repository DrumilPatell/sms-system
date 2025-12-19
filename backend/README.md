# Student Management System - Backend

Production-grade FastAPI backend with OAuth 2.0 authentication (Google, Microsoft, GitHub).

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: OAuth 2.0 + JWT
- **Validation**: Pydantic

## Features

- ✅ OAuth 2.0 login (Google, Microsoft, GitHub)
- ✅ Role-based access control (Admin, Faculty, Student)
- ✅ JWT token authentication
- ✅ User management
- ✅ Student CRUD operations
- ✅ Course management
- ✅ Enrollment system
- ✅ Attendance tracking
- ✅ Grade management

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py          # OAuth & JWT authentication
│   │       │   ├── users.py         # User management
│   │       │   ├── students.py      # Student CRUD
│   │       │   ├── courses.py       # Course management
│   │       │   ├── enrollments.py   # Student-course enrollment
│   │       │   └── academic.py      # Attendance & grades
│   │       └── router.py
│   ├── auth/
│   │   ├── dependencies.py          # Auth dependencies & RBAC
│   │   ├── oauth.py                 # OAuth providers
│   │   └── utils.py                 # User creation & role assignment
│   ├── core/
│   │   ├── config.py                # Settings & environment
│   │   └── security.py              # JWT & password hashing
│   ├── db/
│   │   ├── database.py              # Database connection
│   │   └── models.py                # SQLAlchemy models
│   └── schemas/
│       ├── user.py                  # User schemas
│       ├── student.py               # Student schemas
│       ├── course.py                # Course schemas
│       ├── enrollment.py            # Enrollment schemas
│       └── academic.py              # Attendance & grade schemas
├── main.py
├── requirements.txt
└── .env.example
```

## Setup Instructions

### 1. Prerequisites

- Python 3.9+
- PostgreSQL 13+

### 2. Install Dependencies

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 3. Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE sms_db;
```

### 4. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/sms_db

# JWT Secret (generate a secure random key)
SECRET_KEY=your-super-secret-key-min-32-characters

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Admin Configuration
ADMIN_EMAILS=admin@example.com
FACULTY_DOMAIN=faculty.university.edu
```

### 5. Run Application

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## OAuth Setup Guide

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:8000/api/auth/google/callback`

### Microsoft OAuth

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Create new registration
4. Add redirect URI: `http://localhost:8000/api/auth/microsoft/callback`
5. Create client secret in Certificates & secrets

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Add callback URL: `http://localhost:8000/api/auth/github/callback`

## API Endpoints

### Authentication
- `POST /api/auth/oauth/login` - OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users (Admin only)
- `GET /api/users/` - List users
- `GET /api/users/{id}` - Get user
- `PATCH /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Students (Faculty+)
- `GET /api/students/` - List students
- `GET /api/students/{id}` - Get student
- `POST /api/students/` - Create student (Admin)
- `PATCH /api/students/{id}` - Update student (Admin)
- `DELETE /api/students/{id}` - Delete student (Admin)

### Courses
- `GET /api/courses/` - List courses
- `GET /api/courses/{id}` - Get course
- `POST /api/courses/` - Create course (Admin)
- `PATCH /api/courses/{id}` - Update course (Admin)
- `DELETE /api/courses/{id}` - Delete course (Admin)

### Enrollments (Admin only)
- `GET /api/enrollments/` - List enrollments
- `POST /api/enrollments/` - Create enrollment
- `PATCH /api/enrollments/{id}` - Update enrollment
- `DELETE /api/enrollments/{id}` - Delete enrollment

### Academic (Faculty+)
- `GET /api/academic/attendance/` - List attendance
- `POST /api/academic/attendance/` - Create attendance
- `GET /api/academic/grades/` - List grades
- `POST /api/academic/grades/` - Create grade

## Database Schema

### Tables
- **users** - User accounts with OAuth info
- **students** - Student profiles and academic info
- **courses** - Course catalog
- **enrollments** - Student-course relationships
- **attendance** - Attendance records
- **grades** - Assessment grades

## Role-Based Access Control

- **Admin**: Full system access
- **Faculty**: Manage students, courses, attendance, grades
- **Student**: View own profile and enrolled courses

Roles are automatically assigned based on:
- Email in `ADMIN_EMAILS` → Admin
- Email ending with `FACULTY_DOMAIN` → Faculty
- Default → Student

## Security Features

- OAuth 2.0 authentication
- JWT token-based sessions
- Role-based access control
- Password hashing (bcrypt)
- CORS protection
- SQL injection prevention (SQLAlchemy ORM)
- Input validation (Pydantic)

## Development

Run with auto-reload:
```bash
uvicorn main:app --reload
```

Run tests:
```bash
pytest
```

## Production Deployment

1. Set strong `SECRET_KEY`
2. Use production database
3. Enable HTTPS
4. Set proper CORS origins
5. Use environment variables
6. Set up database migrations with Alembic
7. Use reverse proxy (nginx)
8. Enable rate limiting
9. Set up logging and monitoring

## License

MIT
