# Admin Access Guide

## How to Access Admin Features

### Option 1: Register as Admin
1. Go to **Register Page** (`/register.html`)
2. Fill in your details (name, email, password)
3. Check the box **"Register as Admin"**
4. Enter admin code: `ADMIN2026`
5. Click "Register"
6. You'll be logged in as admin automatically

### Option 2: Admin Login (Existing Admin)
1. Go to **Login Page** (`/login.html`)
2. Click on **"Admin Login"** link at the bottom
3. Or go directly to **Admin Login Page** (`/admin-login.html`)
4. Enter your admin email and password
5. Click "Login as Admin"
6. You'll be redirected to admin dashboard

### Admin Login Links Available On:
- ✅ Regular Login Page (`/login.html`) - "Admin Login" link
- ✅ Register Page (`/register.html`) - "Admin Login" link
- ✅ Direct access via `/admin-login.html`

## Admin Features
Once logged in as admin, you can:
- Add new products
- Edit existing products
- Delete products
- View all orders
- Update order status
- Manage inventory

## Admin Code
**Code:** `ADMIN2026`

This code is required only during registration to create an admin account.

## Security
- Admin login validates user role on backend
- Non-admin accounts cannot access admin dashboard
- JWT token authentication required
- Password hashing with bcrypt
