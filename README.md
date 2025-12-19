# Student Management System

Production-grade Full-Stack Student Management System with OAuth 2.0 authentication, role-based access control, and modern UI.

## 🎯 Overview

A complete student management system built with modern technologies, featuring OAuth authentication (Google, Microsoft, GitHub), role-based dashboards, and comprehensive academic management tools.

## 🚀 Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: OAuth 2.0 + JWT
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **API**: Axios + TanStack Query
- **Routing**: React Router v6

## ✨ Features

### Authentication & Security
- OAuth 2.0 login (Google, Microsoft, GitHub)
- JWT token-based sessions
- Role-based access control (Admin, Faculty, Student)
- Automatic role assignment based on email
- Secure API endpoints

### Admin Features
- User management (CRUD)
- Student profile management
- Course catalog management
- Enrollment management
- System overview dashboard

### Faculty Features
- Course management
- Student tracking
- Attendance marking
- Grade entry and management
- Faculty-specific dashboard

### Student Features
- Personal profile view
- Enrolled courses
- Grade viewing
- Attendance records
- Student dashboard

## 📁 Project Structure

```
sms-system/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/    # API routes
│   │   ├── auth/                # Authentication logic
│   │   ├── core/                # Config & security
│   │   ├── db/                  # Database models
│   │   └── schemas/             # Pydantic schemas
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── layouts/             # Dashboard layout
    │   ├── pages/               # All pages
    │   ├── services/            # API services
    │   ├── store/               # State management
    │   └── lib/                 # Utilities
    ├── package.json
    └── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 13+
- OAuth credentials from Google/Microsoft/GitHub

### Quick Start

1. **Clone and setup the project**
2. **Configure OAuth** - See [QUICK_START_OAUTH.md](./QUICK_START_OAUTH.md) for fast setup
3. **Run the application**

### Detailed Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Create PostgreSQL database**
```sql
CREATE DATABASE sms_db;
```

5. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

6. **Run the backend**
```bash
uvicorn main:app --reload
```

Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/api/docs

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run the frontend**
```bash
npm run dev
```

Frontend runs at: http://localhost:5173

## 🔐 OAuth Configuration

**IMPORTANT**: You must set up OAuth credentials before you can log in.

### Quick Setup
See **[QUICK_START_OAUTH.md](./QUICK_START_OAUTH.md)** for step-by-step guide to get started in 5 minutes.

### Detailed Guide
See **[OAUTH_SETUP.md](./OAUTH_SETUP.md)** for comprehensive setup instructions with all providers.

### Summary
1. Register your app with Google, Microsoft, or GitHub
2. Get Client ID and Client Secret
3. Update `backend/.env` with your credentials
4. Restart the backend server
5. Login should now work!

**Redirect URIs to use**:
- Google: `http://127.0.0.1:8000/api/auth/google/callback`
- Microsoft: `http://127.0.0.1:8000/api/auth/microsoft/callback`
- GitHub: `http://127.0.0.1:8000/api/auth/github/callback`

## 📊 Database Schema

### Core Tables
- **users** - User accounts with OAuth info
- **students** - Student profiles and academic data
- **courses** - Course catalog
- **enrollments** - Student-course relationships
- **attendance** - Attendance tracking
- **grades** - Academic assessments

## 🎨 UI Design

### Design Principles
- Clean and minimal aesthetic
- Responsive mobile-first design
- Consistent color scheme
- Intuitive navigation
- Role-based layouts

### Color Palette
- Primary: Blue (#0ea5e9)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)

## 🔒 Security Features

- OAuth 2.0 authentication
- JWT token-based sessions
- Password hashing (bcrypt)
- Role-based access control
- SQL injection prevention (ORM)
- CORS protection
- Input validation
- Secure HTTP headers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/oauth/login` - OAuth login
- `GET /api/auth/me` - Get current user

### Users (Admin)
- `GET /api/users/` - List users
- `PATCH /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Students (Faculty+)
- `GET /api/students/` - List students
- `POST /api/students/` - Create student
- `PATCH /api/students/{id}` - Update student

### Courses
- `GET /api/courses/` - List courses
- `POST /api/courses/` - Create course
- `PATCH /api/courses/{id}` - Update course

### Academic (Faculty+)
- `GET /api/academic/attendance/` - Get attendance
- `POST /api/academic/attendance/` - Mark attendance
- `GET /api/academic/grades/` - Get grades
- `POST /api/academic/grades/` - Add grade

## 🚀 Deployment

### Backend Deployment
- Use Gunicorn for production
- Set up PostgreSQL database
- Configure environment variables
- Enable HTTPS
- Set up reverse proxy (nginx)

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Configure environment variables
- Set up SPA redirects

## 📈 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Bulk operations
- [ ] File upload for documents
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Mobile app
- [ ] Advanced search and filtering
- [ ] Data export (CSV, PDF)
- [ ] Dark mode

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - Feel free to use this project for learning or production.

## 👨‍💻 Author

Built as a production-ready, resume-worthy full-stack project demonstrating:
- Modern web development practices
- OAuth 2.0 implementation
- RESTful API design
- Role-based access control
- Clean code architecture
- Responsive UI design

## 📞 Support

For issues or questions, please refer to the individual README files in the `backend/` and `frontend/` directories.
