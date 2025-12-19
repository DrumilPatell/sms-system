# Student Management System - Frontend

Modern, aesthetic React frontend with OAuth 2.0 authentication and role-based dashboards.

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **API Client**: Axios + TanStack Query
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Features

- ✅ OAuth 2.0 login UI (Google, Microsoft, GitHub)
- ✅ Role-based dashboards (Admin, Faculty, Student)
- ✅ Protected routes with authentication
- ✅ Responsive, modern UI design
- ✅ Clean, aesthetic components
- ✅ User management interface
- ✅ Student CRUD operations
- ✅ Course management
- ✅ Enrollment tracking
- ✅ Attendance & grade views

## Project Structure

```
frontend/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.jsx      # Main dashboard layout with sidebar
│   ├── pages/
│   │   ├── LoginPage.jsx            # OAuth login page
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   │   ├── FacultyDashboard.jsx # Faculty dashboard
│   │   │   └── StudentDashboard.jsx # Student dashboard
│   │   ├── UsersPage.jsx            # User management
│   │   ├── StudentsPage.jsx         # Student management
│   │   ├── CoursesPage.jsx          # Course management
│   │   ├── EnrollmentsPage.jsx      # Enrollment management
│   │   ├── AttendancePage.jsx       # Attendance tracking
│   │   └── GradesPage.jsx           # Grade management
│   ├── services/
│   │   └── api.js                   # API service functions
│   ├── store/
│   │   └── authStore.js             # Authentication state
│   ├── lib/
│   │   └── api.js                   # Axios instance with interceptors
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Tailwind styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the variables:

```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_MICROSOFT_CLIENT_ID=your-microsoft-client-id
VITE_GITHUB_CLIENT_ID=your-github-client-id
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend will be available at: http://localhost:5173

## OAuth Implementation

### Current Demo Mode

The login page demonstrates the OAuth flow but auto-logs in for testing. To implement actual OAuth:

### Google OAuth

Install the Google OAuth library:

```bash
npm install @react-oauth/google
```

Wrap your app with the Google OAuth provider:

```jsx
import { GoogleOAuthProvider } from '@react-oauth/google'

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <App />
</GoogleOAuthProvider>
```

Use the Google login button:

```jsx
import { GoogleLogin } from '@react-oauth/google'

<GoogleLogin
  onSuccess={(credentialResponse) => {
    // Send credentialResponse.credential to backend
    handleOAuthLogin('google', credentialResponse.credential)
  }}
  onError={() => console.log('Login Failed')}
/>
```

### Microsoft OAuth

Install MSAL:

```bash
npm install @azure/msal-react @azure/msal-browser
```

Configure MSAL provider:

```jsx
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
}

const msalInstance = new PublicClientApplication(msalConfig)

<MsalProvider instance={msalInstance}>
  <App />
</MsalProvider>
```

### GitHub OAuth

Install GitHub OAuth:

```bash
npm install react-github-login
```

Use GitHub login:

```jsx
import GitHubLogin from 'react-github-login'

<GitHubLogin
  clientId={import.meta.env.VITE_GITHUB_CLIENT_ID}
  onSuccess={(response) => {
    // Send response.code to backend
    handleOAuthLogin('github', response.code)
  }}
  onFailure={(response) => console.error(response)}
/>
```

## Design System

### Color Palette

```css
Primary: Blue (#0ea5e9)
Success: Green (#10b981)
Warning: Yellow (#f59e0b)
Danger: Red (#ef4444)
```

### Components

All components use Tailwind CSS utility classes for consistency:

- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- **Cards**: `.card`
- **Badges**: `.badge`, `.badge-primary`, `.badge-success`, etc.
- **Inputs**: `.input`

### Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive grids and tables
- Touch-friendly buttons

## Role-Based Access

### Admin Dashboard
- System overview
- User management
- All CRUD operations
- Enrollment management

### Faculty Dashboard
- Course overview
- Student management
- Attendance tracking
- Grade management

### Student Dashboard
- Personal profile
- Enrolled courses
- View grades
- View attendance

## API Integration

All API calls use TanStack Query for caching and state management:

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ['students'],
  queryFn: () => studentsApi.getStudents(),
})
```

### Authentication Flow

1. User clicks OAuth provider button
2. OAuth popup/redirect authenticates user
3. Frontend receives access token
4. Send token to backend `/api/auth/oauth/login`
5. Backend verifies with provider
6. Backend returns JWT token
7. Frontend stores JWT in Zustand + localStorage
8. All subsequent API calls include JWT

## Build for Production

```bash
npm run build
```

Build output will be in `dist/` folder.

## Deployment

### Static Hosting (Netlify, Vercel)

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up redirects for SPA routing

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

## Features to Implement

- [ ] Form modals for CRUD operations
- [ ] Confirmation dialogs for deletions
- [ ] Toast notifications
- [ ] Search and filtering
- [ ] Pagination
- [ ] Data export (CSV, PDF)
- [ ] Dark mode toggle
- [ ] Advanced reporting
- [ ] File upload for profile pictures

## License

MIT
