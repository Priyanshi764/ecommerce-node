# 🚀 Quick Setup Guide - ShopEase

## Step-by-Step Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Make sure your `.env` file has:
```env
MONGO_URI=mongodb+srv://priyanshi:priyanshi%401301@cluster0.juihmrr.mongodb.net/ecommerce
JWT_SECRET=secret123
PORT=5000
```

### 3. Seed Products (30 Items)
```bash
npm run seed
```

This will add 30 professional products across 5 categories:
- Electronics (9 items)
- Fashion (7 items)
- Home & Kitchen (7 items)
- Sports (3 items)
- Accessories (4 items)

### 4. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 5. Access the Website
Open your browser and go to:
```
http://localhost:5000
```

## 🎨 New Professional Features

### Design Improvements
✅ Modern gradient color scheme
✅ Smooth animations and transitions
✅ Professional card designs with hover effects
✅ Responsive layout for all devices
✅ Custom scrollbar styling
✅ Sticky navigation bar
✅ Beautiful hero section with patterns

### Functional Features
✅ 30 products with real images
✅ Advanced search functionality
✅ Category filtering (5 categories)
✅ Sort by price, rating, newest
✅ Shopping cart with quantity controls
✅ Order history tracking
✅ User authentication
✅ Product ratings display
✅ Professional order status badges

## 📱 Pages Available

1. **Home** (`/index.html`) - Browse all products with filters
2. **Login** (`/login.html`) - User authentication
3. **Register** (`/register.html`) - New user signup
4. **Cart** (`/cart.html`) - Shopping cart management
5. **Orders** (`/orders.html`) - Order history
6. **Product Details** (`/product.html`) - Individual product view

## 🎯 Test the Website

### Create a Test Account
1. Go to Register page
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: test123

### Browse Products
- Use search bar to find products
- Filter by category
- Sort by price or rating

### Make a Purchase
1. Add items to cart
2. Go to cart page
3. Click "Proceed to Checkout"
4. Fill shipping details
5. View order in Orders page

## 🔧 Troubleshooting

**Products not showing?**
- Run `npm run seed` again

**Can't login?**
- Check MongoDB connection in `.env`
- Make sure server is running

**Styling issues?**
- Clear browser cache
- Hard refresh (Ctrl + Shift + R)

## 🎨 Color Scheme

- Primary Blue: `#2563eb`
- Secondary Purple: `#8b5cf6`
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Danger Red: `#ef4444`
- Dark: `#0f172a`

## 📊 Database Collections

- **users** - User accounts
- **products** - Product catalog (30 items)
- **orders** - Order history

Enjoy your professional e-commerce platform! 🎉
