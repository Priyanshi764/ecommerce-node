# ShopEase - Professional E-Commerce Platform

A full-stack e-commerce website built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

### User Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Browse Products with Search & Filters
- ✅ Category-based Product Filtering
- ✅ Sort by Price, Rating, and Date
- ✅ Shopping Cart with Quantity Management
- ✅ Secure Checkout Process
- ✅ Order History & Tracking
- ✅ Product Reviews & Ratings
- ✅ Wishlist Functionality
- ✅ Responsive Design

### Admin Features
- ✅ Add, Edit, Delete Products
- ✅ Manage Orders & Update Status
- ✅ View All Orders
- ✅ Stock Management

### Technical Features
- ✅ RESTful API Architecture
- ✅ JWT Token-based Authentication
- ✅ Password Hashing with bcrypt
- ✅ MongoDB Database with Mongoose ODM
- ✅ Error Handling & Validation
- ✅ CORS Enabled
- ✅ JSON-based Product Seeding

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Poppins)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ecommerce-node
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. **Seed the database with products**
```bash
npm run seed
```

5. **Start the server**
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

6. **Access the application**
Open your browser and navigate to:
```
http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/wishlist/:productId` - Toggle wishlist (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories
- `POST /api/products/add` - Add product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/review` - Add review (Protected)

### Orders
- `POST /api/orders/checkout` - Place order (Protected)
- `GET /api/orders/my-orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Project Structure

```
ecommerce-node/
├── config/
│   └── db.js
├── data/
│   └── products.json          # Product seed data
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── cart.html
│   ├── orders.html
│   └── product.html
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── scripts/
│   └── seedProducts.js
├── .env
├── package.json
├── server.js
└── README.md
```

## Usage

### For Users
1. Register a new account or login
2. Browse products on the home page
3. Use search and filters to find products
4. Add products to cart
5. Proceed to checkout
6. View order history

### For Admins
To create an admin user, manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Product Categories
- Electronics
- Fashion
- Home & Kitchen
- Sports
- Accessories

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- CORS configuration

## Future Enhancements
- Payment gateway integration (Stripe/Razorpay)
- Email notifications
- Advanced admin dashboard
- Product image upload
- Multiple product images
- Coupon codes & discounts
- Social media login
- Real-time order tracking
- Customer support chat

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
MIT

## Author
Your Name

## Support
For support, email support@shopease.com
