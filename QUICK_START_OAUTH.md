# Quick Start: Setting Up OAuth Authentication

## What You Need to Do

To enable login with Google, Microsoft, and GitHub, you need to register your app with each provider and get credentials.

## ⚡ Fast Track (Choose One Provider to Start)

### Option 1: Start with Google (Recommended - Easiest)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** called "Student Management System"
3. **Go to APIs & Services → Credentials**
4. **Click "Create Credentials" → "OAuth client ID"**
5. **Configure OAuth consent screen** (one-time setup):
   - App name: Student Management System
   - User support email: your email
   - Scopes: email, profile, openid
6. **Create Web application credentials**:
   - Authorized redirect URI: `http://127.0.0.1:8000/api/auth/google/callback`
7. **Copy Client ID and Client Secret**
8. **Update `backend/.env`**:
   ```env
   GOOGLE_CLIENT_ID=paste-your-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
   ```
9. **Restart backend server**

---

### Option 2: Start with GitHub (Second Easiest)

1. **Go to GitHub Settings**: https://github.com/settings/developers
2. **Click "OAuth Apps" → "New OAuth App"**
3. **Fill in**:
   - Application name: Student Management System
   - Homepage URL: `http://localhost:8000`
   - Authorization callback URL: `http://127.0.0.1:8000/api/auth/github/callback`
4. **Register application**
5. **Generate a client secret**
6. **Copy Client ID and Secret**
7. **Update `backend/.env`**:
   ```env
   GITHUB_CLIENT_ID=paste-your-client-id-here
   GITHUB_CLIENT_SECRET=paste-your-client-secret-here
   ```
8. **Restart backend server**

---

### Option 3: Start with Microsoft

1. **Go to Azure Portal**: https://portal.azure.com/
2. **Navigate to "App registrations" → "New registration"**
3. **Fill in**:
   - Name: Student Management System
   - Supported accounts: Personal Microsoft accounts
   - Redirect URI: `http://127.0.0.1:8000/api/auth/microsoft/callback`
4. **Copy Application (client) ID**
5. **Go to "Certificates & secrets" → Create new client secret**
6. **Copy the secret value immediately**
7. **Update `backend/.env`**:
   ```env
   MICROSOFT_CLIENT_ID=paste-your-client-id-here
   MICROSOFT_CLIENT_SECRET=paste-your-secret-here
   ```
8. **Restart backend server**

---

## 🚀 Testing Your Setup

1. **Make sure both servers are running**:
   ```powershell
   # Backend terminal (in backend folder)
   .\venv\Scripts\Activate.ps1
   uvicorn main:app --reload --host 127.0.0.1 --port 8000

   # Frontend terminal (in frontend folder)
   npm run dev
   ```

2. **Open your browser** to the frontend URL (usually `http://localhost:5173`)

3. **Click the OAuth button** you configured (Google, Microsoft, or GitHub)

4. **You'll be redirected** to the provider's login page

5. **After logging in**, you'll be redirected back and logged into the SMS

---

## ❗ Common Issues

### "redirect_uri_mismatch" Error
- The redirect URI must **exactly match** what you entered in the OAuth app settings
- Use `http://127.0.0.1:8000/api/auth/PROVIDER/callback` (not `localhost`)

### "invalid_client" Error
- Double-check you copied the Client ID and Secret correctly
- Make sure there are no spaces or extra characters
- Try regenerating the client secret

### Nothing Happens When Clicking Login Button
- Check browser console for errors (F12)
- Make sure backend is running on port 8000
- Check that `.env` variables are set correctly

---

## 📚 Full Documentation

For detailed step-by-step instructions with screenshots, see **[OAUTH_SETUP.md](./OAUTH_SETUP.md)**

---

## 💡 Pro Tips

1. **Start with one provider** - Get Google working first, then add others
2. **Test with your personal account** - Use your own email for initial testing
3. **Check the backend logs** - Most errors show up there with details
4. **Use 127.0.0.1, not localhost** - More reliable for OAuth redirects
5. **Restart backend after changing .env** - Environment variables load at startup

---

## Next Steps After OAuth Works

1. **Configure user roles** - Default role is "student", you can change this in the database
2. **Add more features** - The OAuth setup enables all the dashboard features
3. **Deploy to production** - Update OAuth apps with your production URLs
4. **Set up all three providers** - Give users multiple login options

---

Need help? Check the full guide in **OAUTH_SETUP.md** or backend logs for error details.
