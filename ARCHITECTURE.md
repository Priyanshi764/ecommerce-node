# 🏗️ System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     SHOPEASE E-COMMERCE                      │
│                  Complete Shopping Platform                  │
└─────────────────────────────────────────────────────────────┘
```

---

## System Layers

```
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND (9 Pages)                       │
├──────────────────────────────────────────────────────────────┤
│  Home  │  Cart  │  Wishlist  │  Orders  │  Admin  │  Login  │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ HTTP Requests (JWT Token)
         │
┌────────▼─────────────────────────────────────────────────────┐
│                    API LAYER (Express.js)                     │
├──────────────────────────────────────────────────────────────┤
│  Auth Routes  │  Product Routes  │  Order Routes             │
│  (10 endpoints) │ (7 endpoints)   │ (5 endpoints)            │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Mongoose ODM
         │
┌────────▼─────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB)                          │
├──────────────────────────────────────────────────────────────┤
│  Users Collection  │  Products Collection  │  Orders         │
│  (with cart &      │  (30 items)          │  Collection     │
│   wishlist)        │                      │                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Cart Persistence Flow

```
User Adds to Cart
       │
       ▼
Frontend sends POST /api/auth/cart/add
       │
       ▼
Backend validates JWT token
       │
       ▼
Add item to User.cart in MongoDB
       │
       ▼
Return updated cart
       │
       ▼
Frontend updates UI

User Logs Out
       │
       ▼
Clear localStorage (token only)
       │
       ▼
Cart remains in database ✅

User Logs In
       │
       ▼
Backend returns user with cart
       │
       ▼
Frontend displays cart items ✅
```

### 2. Admin Add Product Flow

```
Admin Fills Form
       │
       ▼
Frontend sends POST /api/products/add
       │
       ▼
Backend checks admin role
       │
       ▼
Create product in MongoDB
       │
       ▼
Product immediately available
       │
       ▼
Frontend refreshes product list ✅
```

### 3. Order Flow

```
User Clicks Checkout
       │
       ▼
Collect shipping address
       │
       ▼
POST /api/orders/checkout
       │
       ▼
Validate stock availability
       │
       ▼
Create order in database
       │
       ▼
Reduce product stock
       │
       ▼
Clear user cart
       │
       ▼
Redirect to orders page ✅
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  cart: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],
  wishlist: [ObjectId],
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
  rating: Number,
  reviews: [
    {
      userId: ObjectId,
      userName: String,
      rating: Number,
      comment: String,
      createdAt: Date
    }
  ],
  featured: Boolean,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: Number,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: String,
  createdAt: Date
}
```

---

## API Endpoints Map

### Authentication & Cart (10)
```
POST   /api/auth/register          → Create user
POST   /api/auth/login             → Login user
GET    /api/auth/me                → Get current user
POST   /api/auth/cart/add          → Add to cart
PUT    /api/auth/cart/update/:id   → Update quantity
DELETE /api/auth/cart/remove/:id   → Remove item
DELETE /api/auth/cart/clear        → Clear cart
GET    /api/auth/cart              → Get cart
POST   /api/auth/wishlist/:id      → Toggle wishlist
GET    /api/auth/wishlist          → Get wishlist
```

### Products (7)
```
GET    /api/products               → Get all products
GET    /api/products/:id           → Get single product
GET    /api/products/categories/list → Get categories
POST   /api/products/add           → Add product (admin)
PUT    /api/products/:id           → Update product (admin)
DELETE /api/products/:id           → Delete product (admin)
POST   /api/products/:id/review    → Add review
```

### Orders (5)
```
POST /api/orders/checkout          → Place order
GET  /api/orders/my-orders         → Get user orders
GET  /api/orders/:id               → Get single order
GET  /api/orders                   → Get all orders (admin)
PUT  /api/orders/:id/status        → Update status (admin)
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Password Hashing (bcrypt, 10 rounds)               │
│     ↓                                                    │
│  2. JWT Token Generation (30-day expiry)               │
│     ↓                                                    │
│  3. Token Validation Middleware                         │
│     ↓                                                    │
│  4. Role-Based Access Control                           │
│     ↓                                                    │
│  5. Input Validation                                    │
│     ↓                                                    │
│  6. Error Handling                                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## User Journey Map

### Regular User Journey
```
1. Register/Login
   ↓
2. Browse Products (Search/Filter)
   ↓
3. Add to Cart (Persists in DB)
   ↓
4. Add to Wishlist (Optional)
   ↓
5. Checkout (Shipping Details)
   ↓
6. Place Order
   ↓
7. Track Order Status
   ↓
8. Add Reviews (Optional)
```

### Admin Journey
```
1. Login as Admin
   ↓
2. Access Admin Dashboard
   ↓
3. Add New Products (Form)
   ↓
4. Manage Existing Products
   ↓
5. View All Orders
   ↓
6. Update Order Status
   ↓
7. Manage Inventory
```

---

## Technology Stack

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND                               │
├──────────────────────────────────────────────────────────┤
│  HTML5  │  CSS3  │  JavaScript ES6+  │  Fetch API       │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    BACKEND                                │
├──────────────────────────────────────────────────────────┤
│  Node.js  │  Express.js  │  JWT  │  bcrypt             │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    DATABASE                               │
├──────────────────────────────────────────────────────────┤
│  MongoDB  │  Mongoose ODM                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    DESIGN                                 │
├──────────────────────────────────────────────────────────┤
│  Poppins Font  │  CSS Variables  │  Gradients           │
└──────────────────────────────────────────────────────────┘
```

---

## Feature Architecture

### Cart System
```
┌─────────────────────────────────────────────────────┐
│              Cart Architecture                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Frontend (UI)                                      │
│       ↕                                             │
│  API Layer (CRUD operations)                        │
│       ↕                                             │
│  Database (User.cart array)                         │
│                                                      │
│  Features:                                          │
│  • Add items                                        │
│  • Update quantity                                  │
│  • Remove items                                     │
│  • Clear cart                                       │
│  • Persist after logout ✅                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Wishlist System
```
┌─────────────────────────────────────────────────────┐
│            Wishlist Architecture                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Frontend (Heart Button)                            │
│       ↕                                             │
│  API Layer (Toggle)                                 │
│       ↕                                             │
│  Database (User.wishlist array)                     │
│                                                      │
│  Features:                                          │
│  • Add to wishlist                                  │
│  • Remove from wishlist                             │
│  • View wishlist page                               │
│  • Add to cart from wishlist                        │
│  • Persist across sessions ✅                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Admin System
```
┌─────────────────────────────────────────────────────┐
│             Admin Architecture                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Admin Dashboard (UI)                               │
│       ↕                                             │
│  Admin Middleware (Role Check)                      │
│       ↕                                             │
│  Admin Routes (Protected)                           │
│       ↕                                             │
│  Database (Products & Orders)                       │
│                                                      │
│  Features:                                          │
│  • Add products via form ✅                        │
│  • Edit products                                    │
│  • Delete products                                  │
│  • View all orders                                  │
│  • Update order status                              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│                  Production Setup                     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Frontend (Static Files)                             │
│       ↓                                              │
│  Express Server (Node.js)                            │
│       ↓                                              │
│  MongoDB Atlas (Cloud Database)                      │
│                                                       │
│  Environment Variables:                              │
│  • MONGO_URI                                         │
│  • JWT_SECRET                                        │
│  • PORT                                              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Performance Optimization

```
┌──────────────────────────────────────────────────────┐
│              Performance Features                     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  • Database indexing (email, productId)              │
│  • Efficient queries (populate, select)              │
│  • JWT token caching                                 │
│  • CSS animations (GPU accelerated)                  │
│  • Image optimization (Unsplash CDN)                 │
│  • Minimal re-renders                                │
│  • Async/await patterns                              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Scalability

```
Current: Single Server + MongoDB
         ↓
Future:  Load Balancer
         ↓
         Multiple Servers
         ↓
         MongoDB Replica Set
         ↓
         Redis Cache
         ↓
         CDN for Static Assets
```

---

## Summary

✅ **3-Tier Architecture**
- Frontend (HTML/CSS/JS)
- Backend (Node.js/Express)
- Database (MongoDB)

✅ **RESTful API Design**
- 20+ endpoints
- JWT authentication
- Role-based access

✅ **Database-Driven**
- Cart in database
- Wishlist in database
- Orders in database

✅ **Secure & Scalable**
- Password hashing
- Token authentication
- Error handling
- Input validation

**Production-Ready Architecture! 🚀**
