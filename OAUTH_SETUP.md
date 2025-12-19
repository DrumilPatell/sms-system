# OAuth Setup Guide

This guide will help you set up OAuth authentication with Google, Microsoft, and GitHub for the Student Management System.

## Overview

The application uses OAuth 2.0 for authentication. You need to register your application with each provider and obtain client credentials.

---

## 1. Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Student Management System`
4. Click "Create"

### Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: Student Management System
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click "Save and Continue"
6. On "Scopes" page, click "Add or Remove Scopes"
7. Add these scopes:
   - `openid`
   - `email`
   - `profile`
8. Click "Save and Continue"
9. Add test users (your email) if app is in testing mode
10. Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name**: SMS Backend
   - **Authorized JavaScript origins**: 
     - `http://localhost:8000`
     - `http://127.0.0.1:8000`
   - **Authorized redirect URIs**:
     - `http://localhost:8000/api/auth/google/callback`
     - `http://127.0.0.1:8000/api/auth/google/callback`
5. Click "Create"
6. **Save the Client ID and Client Secret**

### Step 5: Update Backend .env

```env
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/google/callback
```

---

## 2. Microsoft OAuth Setup

### Step 1: Register Application in Azure

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" (now called "Microsoft Entra ID")
3. Click "App registrations" → "New registration"

### Step 2: Configure Application

1. Fill in the registration form:
   - **Name**: Student Management System
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: 
     - Platform: Web
     - URI: `http://127.0.0.1:8000/api/auth/microsoft/callback`
2. Click "Register"

### Step 3: Get Client ID

1. On the app's Overview page, copy the **Application (client) ID**
2. Copy the **Directory (tenant) ID** (or use "common" for multi-tenant)

### Step 4: Create Client Secret

1. Click "Certificates & secrets" in the left menu
2. Click "New client secret"
3. Add description: "SMS Backend Secret"
4. Set expiration (recommend: 24 months)
5. Click "Add"
6. **Copy the secret Value immediately** (you won't see it again!)

### Step 5: Configure API Permissions

1. Click "API permissions" in the left menu
2. Click "Add a permission"
3. Select "Microsoft Graph"
4. Select "Delegated permissions"
5. Add these permissions:
   - `openid`
   - `email`
   - `profile`
   - `User.Read`
6. Click "Add permissions"
7. Click "Grant admin consent" (if you have admin rights)

### Step 6: Update Backend .env

```env
MICROSOFT_CLIENT_ID=your-application-client-id-here
MICROSOFT_CLIENT_SECRET=your-client-secret-value-here
MICROSOFT_REDIRECT_URI=http://127.0.0.1:8000/api/auth/microsoft/callback
MICROSOFT_TENANT_ID=common
```

Note: Use `common` for multi-tenant apps, or your specific tenant ID for single-tenant

---

## 3. GitHub OAuth Setup

### Step 1: Register OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "OAuth Apps" → "New OAuth App"

### Step 2: Configure Application

1. Fill in the form:
   - **Application name**: Student Management System
   - **Homepage URL**: `http://localhost:8000`
   - **Authorization callback URL**: `http://127.0.0.1:8000/api/auth/github/callback`
   - **Application description**: (optional) OAuth for student management
2. Click "Register application"

### Step 3: Get Credentials

1. You'll see your **Client ID** on the next page
2. Click "Generate a new client secret"
3. **Copy the client secret immediately** (you won't see it again!)

### Step 4: Update Backend .env

```env
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here
GITHUB_REDIRECT_URI=http://127.0.0.1:8000/api/auth/github/callback
```

---

## 4. Testing OAuth Flow

### Step 1: Update .env Files

Make sure both backend and frontend `.env` files are configured:

**Backend `.env`**:
```env
# Your OAuth credentials from above
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`**:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Step 2: Restart Servers

```powershell
# Backend (in backend folder with venv activated)
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Frontend (in frontend folder)
npm run dev
```

### Step 3: Test Login Flow

1. Open `http://localhost:5173` (or the port shown by Vite)
2. Click on any OAuth provider button (Google, Microsoft, or GitHub)
3. You'll be redirected to the provider's login page
4. After authorizing, you'll be redirected back to the app
5. You should be logged in and see the dashboard

---

## 5. Common Issues & Troubleshooting

### Issue: "redirect_uri_mismatch" error

**Solution**: Make sure the redirect URI in your OAuth app settings exactly matches the one in your `.env` file. Common differences:
- `http://` vs `https://`
- `localhost` vs `127.0.0.1`
- Missing or extra `/` at the end
- Port number mismatch

### Issue: "invalid_client" error

**Solution**: 
- Double-check your Client ID and Client Secret
- Make sure there are no extra spaces or newlines
- Regenerate the client secret if needed

### Issue: Backend returns 404 for callback

**Solution**:
- Make sure the backend server is running on the correct port (8000)
- Check that the API routes are registered correctly
- Verify CORS settings allow requests from frontend

### Issue: User created but no role assigned

**Solution**: The default role for new users is "student". To make a user admin:
1. Access your PostgreSQL database
2. Run: `UPDATE users SET role = 'admin' WHERE email = 'your@email.com';`

### Issue: OAuth works but login doesn't persist

**Solution**:
- Check browser console for localStorage errors
- Ensure cookies aren't blocked
- Try clearing browser cache and localStorage

---

## 6. Production Deployment

When deploying to production, update these settings:

### Update OAuth App Settings

For each provider, add your production URLs:
- **Google**: Add `https://yourdomain.com` to Authorized JavaScript origins and `https://yourdomain.com/api/auth/google/callback` to redirect URIs
- **Microsoft**: Add `https://yourdomain.com/api/auth/microsoft/callback` to redirect URIs
- **GitHub**: Update Homepage URL and callback URL to use your domain

### Update Environment Variables

```env
# Backend
FRONTEND_URL=https://yourdomain.com
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
MICROSOFT_REDIRECT_URI=https://yourdomain.com/api/auth/microsoft/callback
GITHUB_REDIRECT_URI=https://yourdomain.com/api/auth/github/callback

# Frontend
VITE_API_URL=https://yourdomain.com/api
```

### Security Recommendations

1. **Use HTTPS in production** - Never use OAuth with HTTP in production
2. **Rotate secrets regularly** - Change client secrets every 6-12 months
3. **Limit OAuth scopes** - Only request the permissions you need
4. **Implement rate limiting** - Prevent brute force attacks
5. **Monitor OAuth failures** - Set up logging and alerts
6. **Use environment-specific apps** - Separate OAuth apps for dev/staging/prod

---

## 7. Role Assignment Strategy

By default, new users are created with the "student" role. You have several options:

### Option 1: Manual Admin Assignment
Admins manually promote users through the UI or database

### Option 2: Email-based Auto-assignment
Add admin emails to `.env`:
```env
ADMIN_EMAILS=admin@university.edu,dean@university.edu
FACULTY_EMAILS=faculty.edu
```

The system checks email domains/addresses and assigns roles automatically.

### Option 3: First User is Admin
The very first user to register becomes admin, then they manage roles.

---

## Need Help?

- Check the backend logs for detailed error messages
- Visit provider documentation:
  - [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
  - [Microsoft OAuth Docs](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
  - [GitHub OAuth Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
