# EduManage - Student Management System

Modern full-stack student management system with OAuth authentication, role-based access control, and comprehensive academic tracking.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+

### Installation

**1. Clone & Setup**
```bash
git clone https://github.com/DrumilPatell/sms-system.git
cd edumanage-sms
```

**2. Backend Setup**
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `.env` file:
```env
DATABASE_URL=postgresql+pg8000://postgres:password@localhost:5432/edumanage_db
SECRET_KEY=your-secret-key-min-32-characters
FRONTEND_URL=http://localhost:5173
```

Initialize database:
```bash
python init_db.py
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## 🎯 Features

### Authentication
- OAuth 2.0 (Google, Microsoft, GitHub)
- Email/Password registration
- JWT token sessions
- Auto role assignment

### Role-Based Dashboards
- **Admin**: User/student/course/enrollment management
- **Faculty**: Course management, attendance, grading
- **Student**: View courses, grades, attendance

### Core Functions
- Student profile management
- Course catalog & enrollment
- Attendance tracking
- Grade management
- Real-time updates

## 🛠️ Tech Stack

**Backend**: FastAPI, PostgreSQL, SQLAlchemy, OAuth 2.0  
**Frontend**: React, Vite, Tailwind CSS, Zustand, Axios


## 🔧 Configuration

### OAuth Setup (Optional)
Add to backend `.env`:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
```

Add to frontend `.env`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request


## 👥 Author

**Drumil Patel** - [GitHub](https://github.com/DrumilPatell)

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