# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌────────────┬────────────┬────────────┬────────────┐      │
│  │   Login    │   Admin    │  Faculty   │  Student   │      │
│  │    Page    │ Dashboard  │ Dashboard  │ Dashboard  │      │
│  └────────────┴────────────┴────────────┴────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Protected Routes (React Router)          │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │    State Management (Zustand + TanStack Query)   │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST (Axios)
                        │ JWT Token in Headers
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (FastAPI)                     │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │              API Router (v1)                      │       │
│  │  ┌────────┬────────┬────────┬────────┬────────┐ │       │
│  │  │ Auth   │ Users  │Students│Courses │Academic│ │       │
│  │  └────────┴────────┴────────┴────────┴────────┘ │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │     Authentication & Authorization Layer          │       │
│  │  ┌─────────────────┬──────────────────────┐      │       │
│  │  │ OAuth Providers │  JWT Verification    │      │       │
│  │  │ (Google, MS, GH)│  Role-Based Access   │      │       │
│  │  └─────────────────┴──────────────────────┘      │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Business Logic (Services Layer)           │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │        Database Layer (SQLAlchemy ORM)            │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────┬─────────────────────────────────────┘
                        │ SQL
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                           │
│                                                               │
│  ┌────────┬─────────┬─────────┬────────────┬──────────┐    │
│  │ Users  │Students │ Courses │Enrollments │ Grades   │    │
│  └────────┴─────────┴─────────┴────────────┴──────────┘    │
│                                                               │
│  ┌────────────┐                                              │
│  │ Attendance │                                              │
│  └────────────┘                                              │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────┐
│  User    │         │   Frontend   │         │  Backend │
└────┬─────┘         └──────┬───────┘         └────┬─────┘
     │                      │                      │
     │ 1. Click OAuth Login│                      │
     │─────────────────────>│                      │
     │                      │                      │
     │                      │ 2. Redirect to OAuth │
     │                      │────────────────────> │
     │                      │    Provider (Google, │
     │<─────────────────────│     MS, or GitHub)   │
     │ 3. Authenticate      │                      │
     │                      │                      │
     │ 4. Return token      │                      │
     │─────────────────────>│                      │
     │                      │                      │
     │                      │ 5. Send token        │
     │                      │─────────────────────>│
     │                      │                      │
     │                      │              6. Verify token
     │                      │                with provider
     │                      │                      │
     │                      │              7. Create/Update
     │                      │                   user in DB
     │                      │                      │
     │                      │              8. Generate JWT
     │                      │                      │
     │                      │ 9. Return JWT + User │
     │                      │<─────────────────────│
     │                      │                      │
     │ 10. Store JWT locally│                      │
     │<─────────────────────│                      │
     │                      │                      │
     │ 11. All subsequent   │                      │
     │     API requests ────┼─────────────────────>│
     │     include JWT      │                      │
     │                      │                      │
```

## Database Schema

```
┌─────────────────────┐
│       Users         │
├─────────────────────┤
│ id (PK)             │
│ email (UNIQUE)      │
│ full_name           │
│ role (ENUM)         │◄────┐
│ oauth_provider      │     │
│ oauth_id            │     │
│ is_active           │     │
│ created_at          │     │
└──────────┬──────────┘     │
           │                │
           │ 1:1            │ 1:N (faculty_id)
           ▼                │
┌─────────────────────┐     │
│      Students       │     │
├─────────────────────┤     │
│ id (PK)             │     │
│ user_id (FK)        │     │
│ student_id (UNIQUE) │     │
│ date_of_birth       │     │
│ phone               │     │
│ program             │     │
│ current_semester    │     │
│ gpa                 │     │
└──────────┬──────────┘     │
           │                │
           │ 1:N            │
           ▼                │
┌─────────────────────┐     │
│    Enrollments      │     │
├─────────────────────┤     │
│ id (PK)             │     │
│ student_id (FK)     │     │
│ course_id (FK)      │     │
│ enrollment_date     │     │
│ status              │     │
└──────────┬──────────┘     │
           │                │
           │ N:1            │
           ▼                │
┌─────────────────────┐     │
│       Courses       │     │
├─────────────────────┤     │
│ id (PK)             │     │
│ course_code (UNIQUE)│     │
│ course_name         │     │
│ description         │     │
│ credits             │     │
│ faculty_id (FK)     │─────┘
│ semester            │
│ academic_year       │
│ is_active           │
└──────────┬──────────┘
           │
     ┌─────┴──────┐
     │            │
   1:N          1:N
     ▼            ▼
┌──────────┐  ┌────────┐
│Attendance│  │ Grades │
├──────────┤  ├────────┤
│ id (PK)  │  │ id (PK)│
│student_id│  │student │
│course_id │  │course  │
│ date     │  │ score  │
│ status   │  │ grade  │
└──────────┘  └────────┘
```

## Role-Based Access Control

```
┌─────────────────────────────────────────────────────────┐
│                    User Roles                           │
└─────────────────────────────────────────────────────────┘

┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│    ADMIN     │   │   FACULTY    │   │   STUDENT    │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       │ Full Access      │ Limited Access   │ Read-Only
       │                  │                  │
       ▼                  ▼                  ▼

┌──────────────────────────────────────────────────────┐
│  Users:         ✓ CRUD       ✗              ✗       │
│  Students:      ✓ CRUD       ✓ Read         ✓ Self  │
│  Courses:       ✓ CRUD       ✓ Read/Update  ✓ Read  │
│  Enrollments:   ✓ CRUD       ✗              ✗       │
│  Attendance:    ✓ CRUD       ✓ CRUD         ✓ Read  │
│  Grades:        ✓ CRUD       ✓ CRUD         ✓ Read  │
└──────────────────────────────────────────────────────┘
```

## Frontend Component Structure

```
App.jsx
├── LoginPage.jsx
│   └── OAuth Buttons (Google, Microsoft, GitHub)
│
└── DashboardLayout.jsx (Protected)
    ├── Sidebar Navigation
    ├── Header
    │
    └── Routes
        ├── /dashboard
        │   ├── AdminDashboard.jsx
        │   ├── FacultyDashboard.jsx
        │   └── StudentDashboard.jsx
        │
        ├── /users (Admin only)
        │   └── UsersPage.jsx
        │
        ├── /students (Faculty+)
        │   └── StudentsPage.jsx
        │
        ├── /courses
        │   └── CoursesPage.jsx
        │
        ├── /enrollments (Admin only)
        │   └── EnrollmentsPage.jsx
        │
        ├── /attendance (Faculty+)
        │   └── AttendancePage.jsx
        │
        └── /grades
            └── GradesPage.jsx
```

## Backend API Structure

```
main.py
│
├── /api/v1/
│   │
│   ├── /auth
│   │   ├── POST   /oauth/login
│   │   ├── GET    /me
│   │   └── POST   /logout
│   │
│   ├── /users (Admin only)
│   │   ├── GET    /
│   │   ├── GET    /{id}
│   │   ├── PATCH  /{id}
│   │   └── DELETE /{id}
│   │
│   ├── /students (Faculty+)
│   │   ├── GET    /
│   │   ├── GET    /{id}
│   │   ├── POST   /
│   │   ├── PATCH  /{id}
│   │   ├── DELETE /{id}
│   │   └── GET    /me/profile
│   │
│   ├── /courses
│   │   ├── GET    /
│   │   ├── GET    /{id}
│   │   ├── POST   /
│   │   ├── PATCH  /{id}
│   │   ├── DELETE /{id}
│   │   └── GET    /faculty/my-courses
│   │
│   ├── /enrollments (Admin only)
│   │   ├── GET    /
│   │   ├── POST   /
│   │   ├── PATCH  /{id}
│   │   ├── DELETE /{id}
│   │   └── GET    /student/{id}/courses
│   │
│   └── /academic
│       ├── GET    /attendance/
│       ├── POST   /attendance/
│       ├── PATCH  /attendance/{id}
│       ├── GET    /grades/
│       ├── POST   /grades/
│       ├── PATCH  /grades/{id}
│       └── DELETE /grades/{id}
```

## Data Flow Example: Creating a Student

```
Frontend                Backend                 Database
   │                       │                       │
   │ 1. POST /students     │                       │
   │──────────────────────>│                       │
   │   + JWT Token         │                       │
   │   + Student Data      │                       │
   │                       │                       │
   │                       │ 2. Verify JWT         │
   │                       │    Check role=admin   │
   │                       │                       │
   │                       │ 3. Validate data      │
   │                       │    (Pydantic)         │
   │                       │                       │
   │                       │ 4. Check user exists  │
   │                       │───────────────────────>│
   │                       │<───────────────────────│
   │                       │                       │
   │                       │ 5. Check student_id   │
   │                       │    is unique          │
   │                       │───────────────────────>│
   │                       │<───────────────────────│
   │                       │                       │
   │                       │ 6. Create student     │
   │                       │───────────────────────>│
   │                       │                       │
   │                       │ 7. Update user role   │
   │                       │───────────────────────>│
   │                       │<───────────────────────│
   │                       │                       │
   │ 8. Return created     │                       │
   │    student data       │                       │
   │<──────────────────────│                       │
   │                       │                       │
   │ 9. Update UI          │                       │
   │    (TanStack Query    │                       │
   │     invalidates       │                       │
   │     cache)            │                       │
   │                       │                       │
```

## Technology Stack Summary

```
┌─────────────────────────────────────────────────┐
│              Frontend Layer                     │
│  React 18 + Vite                                │
│  Tailwind CSS (Styling)                         │
│  React Router (Navigation)                      │
│  Zustand (Auth State)                           │
│  TanStack Query (Data Fetching)                 │
│  Axios (HTTP Client)                            │
│  Lucide React (Icons)                           │
└──────────────────┬──────────────────────────────┘
                   │ REST API (JSON)
┌──────────────────┴──────────────────────────────┐
│              Backend Layer                      │
│  FastAPI (Web Framework)                        │
│  Pydantic (Validation)                          │
│  SQLAlchemy (ORM)                               │
│  Python-Jose (JWT)                              │
│  Authlib (OAuth)                                │
│  HTTPX (HTTP Client)                            │
│  Uvicorn (ASGI Server)                          │
└──────────────────┬──────────────────────────────┘
                   │ SQL
┌──────────────────┴──────────────────────────────┐
│              Database Layer                     │
│  PostgreSQL 13+                                 │
│  - Users table                                  │
│  - Students table                               │
│  - Courses table                                │
│  - Enrollments table                            │
│  - Attendance table                             │
│  - Grades table                                 │
└─────────────────────────────────────────────────┘
```
