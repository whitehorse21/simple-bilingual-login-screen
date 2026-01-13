# Bilingual Login System

A simple bilingual (English/Spanish) login screen with PHP/MySQL backend and React/TypeScript frontend.

## Project Structure

```
project/
├── backend/
│   ├── config.php          # Database configuration
│   ├── login.php           # Login API endpoint
│   └── database.sql        # Database schema and sample data
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Login.tsx   # Main login component
│   │   ├── translations/
│   │   │   ├── en.ts       # English translations
│   │   │   └── es.ts       # Spanish translations
│   │   ├── App.tsx         # Main app component
│   │   ├── App.css         # App styles
│   │   └── index.tsx       # Entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── package.json        # Dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md
```

## Setup Instructions

### Backend Setup

1. **Install PHP/MySQL Server**
   - Install XAMPP, WAMP, or any PHP/MySQL server
   - Ensure PHP 7.4+ and MySQL are running

2. **Create Database**
   - Open phpMyAdmin or MySQL command line
   - Import `backend/database.sql` to create the database and sample users
   - Or run the SQL file directly in your MySQL client

3. **Configure Database Connection**
   - Edit `backend/config.php` and update the database credentials:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'root');
     define('DB_PASS', '');
     define('DB_NAME', 'login_db');
     ```

4. **Place Backend Files**
   - Copy the `backend` folder to your web server directory:
     - XAMPP: `C:\xampp\htdocs\backend\`
     - WAMP: `C:\wamp64\www\backend\`
     - Or configure your virtual host accordingly

5. **Test Backend**
   - Access `http://localhost/backend/login.php` in your browser
   - You should see a JSON response (method not allowed, which is expected for GET requests)

### Frontend Setup

1. **Install Node.js**
   - Ensure Node.js (v14+) and npm are installed
   - Verify with: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure API URL** (if needed)
   - If your backend is not at `http://localhost/backend/login.php`, update the fetch URL in `frontend/src/components/Login.tsx`:
     ```typescript
     const response = await fetch('YOUR_BACKEND_URL', {
     ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   - The app will open at `http://localhost:3000`

## Default Credentials

The database includes two sample users:

- **Username:** `admin` | **Password:** `password123`
- **Username:** `testuser` | **Password:** `password123`

## Features

- ✅ Bilingual support (English/Spanish)
- ✅ Language switching without page reload
- ✅ Client-side and server-side form validation
- ✅ Secure password hashing (bcrypt)
- ✅ SQL injection protection (prepared statements)
- ✅ Responsive design
- ✅ Error and success notifications in selected language
- ✅ Loading states during authentication

## Security Notes

For production deployment, consider:

- Use HTTPS instead of HTTP
- Implement rate limiting to prevent brute force attacks
- Add CSRF protection
- Use environment variables for database credentials
- Implement session management
- Add input sanitization
- Configure CORS properly (currently allows all origins)

## Troubleshooting

### CORS Errors
- Ensure your backend is running and accessible
- Check that the API URL in `Login.tsx` matches your backend location
- Verify CORS headers in `login.php` are correct

### Database Connection Errors
- Verify MySQL is running
- Check database credentials in `config.php`
- Ensure the database `login_db` exists

### Frontend Build Errors
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 14 or higher

## Technologies Used

- **Backend:** PHP 7.4+, MySQL
- **Frontend:** React 18, TypeScript 4.9
- **Build Tool:** Create React App
