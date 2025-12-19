# Quick Start Guide

## First Time Setup

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
cp .env.example .env

# Edit .env with your settings (important!)
# - Set DATABASE_URL to your PostgreSQL connection
# - Generate a secure SECRET_KEY
# - Add OAuth credentials from providers
```

### 2. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE sms_db;
\q

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/sms_db
```

### 3. Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your API URL and OAuth client IDs
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
.\venv\Scripts\activate  # Windows
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

## Quick Test (Demo Mode)

The frontend includes a demo mode that auto-logs you in as an admin for testing:

1. Open http://localhost:5173
2. Click any OAuth provider button
3. You'll be logged in automatically as admin
4. Explore the admin dashboard

**Note**: For production, implement actual OAuth using the provider SDKs (see Frontend README).

## Generate Secure SECRET_KEY

```python
# Run in Python
import secrets
print(secrets.token_urlsafe(32))
```

Copy the output to your backend `.env` file.

## Obtaining OAuth Credentials

### Google
1. https://console.cloud.google.com
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect: `http://localhost:8000/api/auth/google/callback`

### Microsoft
1. https://portal.azure.com
2. Azure Active Directory → App registrations
3. New registration
4. Add redirect URI: `http://localhost:8000/api/auth/microsoft/callback`

### GitHub
1. https://github.com/settings/developers
2. New OAuth App
3. Callback URL: `http://localhost:8000/api/auth/github/callback`

## Default Roles

Roles are assigned based on email:

- **Admin**: Emails listed in `ADMIN_EMAILS` environment variable
- **Faculty**: Emails ending with `FACULTY_DOMAIN`
- **Student**: All other emails (default)

Example `.env` configuration:
```env
ADMIN_EMAILS=admin@university.edu,principal@university.edu
FACULTY_DOMAIN=faculty.university.edu
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- Verify database exists

### CORS Error
- Check FRONTEND_URL in backend `.env`
- Ensure frontend is running on http://localhost:5173

### OAuth Not Working
- Verify OAuth credentials are correct
- Check redirect URIs match exactly
- For demo mode, just click any button to auto-login

## Next Steps

1. ✅ Set up backend and frontend
2. ✅ Configure environment variables
3. ✅ Start development servers
4. ✅ Test the application
5. 📚 Read individual READMEs for detailed features
6. 🔧 Customize for your needs
7. 🚀 Deploy to production

## Production Checklist

- [ ] Use strong SECRET_KEY
- [ ] Set up production database
- [ ] Configure real OAuth providers
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Use environment variables
- [ ] Set up logging and monitoring
- [ ] Enable rate limiting
- [ ] Run security audit
- [ ] Set up database backups

## Support

- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- API Documentation: http://localhost:8000/api/docs
