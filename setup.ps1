# Student Management System - Windows Setup Script
# Run this script in PowerShell to set up the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Student Management System - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ $pythonVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.9+ from python.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ $pgVersion found" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL not found or not in PATH" -ForegroundColor Yellow
    Write-Host "  Please ensure PostgreSQL is installed and running" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Backend setup
Set-Location backend

# Create virtual environment
Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
python -m venv venv
Write-Host "✓ Virtual environment created" -ForegroundColor Green

# Activate virtual environment and install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ Backend .env file created" -ForegroundColor Green
    Write-Host "⚠ IMPORTANT: Edit backend/.env with your configuration!" -ForegroundColor Yellow
} else {
    Write-Host "✓ Backend .env file already exists" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Frontend setup
Set-Location frontend

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ Frontend .env file created" -ForegroundColor Green
    Write-Host "⚠ IMPORTANT: Edit frontend/.env with your configuration!" -ForegroundColor Yellow
} else {
    Write-Host "✓ Frontend .env file already exists" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create PostgreSQL database:" -ForegroundColor White
Write-Host "   psql -U postgres" -ForegroundColor Gray
Write-Host "   CREATE DATABASE sms_db;" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Configure environment files:" -ForegroundColor White
Write-Host "   - Edit backend/.env (DATABASE_URL, SECRET_KEY, OAuth credentials)" -ForegroundColor Gray
Write-Host "   - Edit frontend/.env (API_URL, OAuth client IDs)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Initialize database with sample data:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "   python init_db.py" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start the backend server (Terminal 1):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "   uvicorn main:app --reload" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Start the frontend server (Terminal 2):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Access the application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host "   Backend:  http://localhost:8000" -ForegroundColor Gray
Write-Host "   API Docs: http://localhost:8000/api/docs" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
