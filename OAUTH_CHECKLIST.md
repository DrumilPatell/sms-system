# OAuth Setup Checklist

Use this checklist to track your OAuth setup progress.

## ✅ Pre-Setup

- [ ] Backend server can start without errors
- [ ] Frontend dev server can start without errors  
- [ ] PostgreSQL is running and database is created
- [ ] Both `.env` files exist (`backend/.env` and `frontend/.env`)

---

## 🔑 Choose Your Provider (Pick at least ONE)

### Option A: Google OAuth (Recommended - Easiest)

- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project: "Student Management System"
- [ ] Enable Google+ API
- [ ] Configure OAuth consent screen
  - [ ] App name: Student Management System
  - [ ] User support email: your email
  - [ ] Scopes: openid, email, profile
- [ ] Create OAuth 2.0 Client ID
  - [ ] Type: Web application
  - [ ] Authorized redirect URI: `http://127.0.0.1:8000/api/auth/google/callback`
- [ ] Copy Client ID to `backend/.env` → `GOOGLE_CLIENT_ID`
- [ ] Copy Client Secret to `backend/.env` → `GOOGLE_CLIENT_SECRET`
- [ ] Verify redirect URI in `.env`: `GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/google/callback`
- [ ] Restart backend server
- [ ] Test login with Google account

---

### Option B: GitHub OAuth (Second Easiest)

- [ ] Go to [GitHub Settings → Developer Settings](https://github.com/settings/developers)
- [ ] Click "OAuth Apps" → "New OAuth App"
- [ ] Fill in application details:
  - [ ] Application name: Student Management System
  - [ ] Homepage URL: `http://localhost:8000`
  - [ ] Authorization callback URL: `http://127.0.0.1:8000/api/auth/github/callback`
- [ ] Register application
- [ ] Copy Client ID to `backend/.env` → `GITHUB_CLIENT_ID`
- [ ] Generate client secret
- [ ] Copy Client Secret to `backend/.env` → `GITHUB_CLIENT_SECRET`
- [ ] Verify redirect URI in `.env`: `GITHUB_REDIRECT_URI=http://127.0.0.1:8000/api/auth/github/callback`
- [ ] Restart backend server
- [ ] Test login with GitHub account

---

### Option C: Microsoft OAuth

- [ ] Go to [Azure Portal](https://portal.azure.com/)
- [ ] Navigate to "App registrations"
- [ ] Click "New registration"
- [ ] Configure application:
  - [ ] Name: Student Management System
  - [ ] Supported accounts: Personal Microsoft accounts
  - [ ] Redirect URI: `http://127.0.0.1:8000/api/auth/microsoft/callback`
- [ ] Copy Application (client) ID to `backend/.env` → `MICROSOFT_CLIENT_ID`
- [ ] Go to "Certificates & secrets"
- [ ] Create new client secret
- [ ] Copy secret value to `backend/.env` → `MICROSOFT_CLIENT_SECRET`
- [ ] Verify redirect URI in `.env`: `MICROSOFT_REDIRECT_URI=http://127.0.0.1:8000/api/auth/microsoft/callback`
- [ ] Restart backend server
- [ ] Test login with Microsoft account

---

## 🧪 Testing

- [ ] Both servers are running (backend on 8000, frontend on 5173/5174)
- [ ] Open frontend URL in browser
- [ ] Click the OAuth button you configured
- [ ] Redirected to provider's login page
- [ ] After login, redirected back to app
- [ ] See dashboard (logged in successfully!)

---

## 🐛 Troubleshooting

If login doesn't work, check these:

### Backend Issues
- [ ] Backend logs show OAuth provider is configured (not warning message)
- [ ] No errors when starting backend server
- [ ] Can access `http://127.0.0.1:8000/api/docs` in browser
- [ ] `.env` file has no extra spaces or quotes around values

### OAuth Configuration Issues
- [ ] Redirect URI in OAuth app **exactly** matches `.env` (including http/https, localhost vs 127.0.0.1)
- [ ] Client ID and Secret are copied correctly (no truncation)
- [ ] OAuth app is not in "testing" mode with restricted users (or you're added as test user)

### Frontend Issues  
- [ ] Frontend `.env` has: `VITE_API_URL=http://127.0.0.1:8000/api`
- [ ] Frontend dev server restarted after changing `.env`
- [ ] Browser console shows no CORS errors
- [ ] Can see network request to `/api/auth/{provider}/login` in browser DevTools

### Common Errors
- **"redirect_uri_mismatch"**: Redirect URIs don't match exactly
- **"invalid_client"**: Wrong Client ID or Secret
- **"unauthorized_client"**: OAuth app not properly configured
- **404 on callback**: Backend server not running or route issue
- **CORS error**: Backend CORS not allowing frontend URL

---

## ✨ Post-Setup

After successful login:

- [ ] Check which role you were assigned (default: student)
- [ ] To become admin: Update role in database
  ```sql
  UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
  ```
- [ ] Test other features (courses, students, etc.)
- [ ] Set up additional OAuth providers (optional)
- [ ] Add other users for testing

---

## 📚 Reference Documents

- **QUICK_START_OAUTH.md** - Fast setup guide (5 min)
- **OAUTH_SETUP.md** - Detailed step-by-step with screenshots
- **OAUTH_IMPLEMENTATION.md** - Technical details of how OAuth works
- **README.md** - General project overview

---

## 🎯 Success Criteria

You've successfully set up OAuth when:

✅ Backend starts without OAuth warning  
✅ Can click login button and get redirected to provider  
✅ After authorizing, redirected back to app  
✅ Dashboard loads with your user info  
✅ Can navigate to different pages  
✅ Token persists (refresh page and still logged in)  

---

**Need help?** Check the troubleshooting section or refer to the detailed guides!
