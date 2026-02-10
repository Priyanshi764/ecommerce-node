# 🎯 Quick Commands Reference

## Essential Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database (Add 30 Products)
```bash
npm run seed
```

### 3. Start Server
```bash
npm start
```

### 4. Start Development Server (with auto-reload)
```bash
npm run dev
```

---

## Access URLs

### Main Website
```
http://localhost:5000
```

### Individual Pages
```
Home:         http://localhost:5000/index.html
Login:        http://localhost:5000/login.html
Register:     http://localhost:5000/register.html
Cart:         http://localhost:5000/cart.html
Orders:       http://localhost:5000/orders.html
Showcase:     http://localhost:5000/showcase.html
```

---

## API Endpoints

### Authentication
```bash
# Register
POST http://localhost:5000/api/auth/register

# Login
POST http://localhost:5000/api/auth/login

# Get Current User
GET http://localhost:5000/api/auth/me
```

### Products
```bash
# Get All Products
GET http://localhost:5000/api/products

# Get Single Product
GET http://localhost:5000/api/products/:id

# Get Categories
GET http://localhost:5000/api/products/categories/list

# Search Products
GET http://localhost:5000/api/products?search=wireless

# Filter by Category
GET http://localhost:5000/api/products?category=Electronics

# Sort Products
GET http://localhost:5000/api/products?sort=price-low
```

### Orders
```bash
# Place Order
POST http://localhost:5000/api/orders/checkout

# Get My Orders
GET http://localhost:5000/api/orders/my-orders

# Get Single Order
GET http://localhost:5000/api/orders/:id
```

---

## MongoDB Commands (if needed)

### Connect to MongoDB
```bash
mongosh "mongodb+srv://priyanshi:priyanshi%401301@cluster0.juihmrr.mongodb.net/ecommerce"
```

### View Collections
```javascript
show collections
```

### Count Products
```javascript
db.products.countDocuments()
```

### View All Products
```javascript
db.products.find().pretty()
```

### View All Users
```javascript
db.users.find().pretty()
```

### View All Orders
```javascript
db.orders.find().pretty()
```

### Clear Products
```javascript
db.products.deleteMany({})
```

### Make User Admin
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## Git Commands (if using version control)

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit
```bash
git commit -m "Initial commit: Professional e-commerce platform"
```

### Add Remote
```bash
git remote add origin <your-repo-url>
```

### Push to GitHub
```bash
git push -u origin main
```

---

## Testing Commands

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Get Products
```bash
curl http://localhost:5000/api/products
```

---

## Troubleshooting Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :5000
```

### Kill Process on Port 5000 (Windows)
```bash
taskkill /PID <PID> /F
```

---

## Development Workflow

### 1. First Time Setup
```bash
npm install
npm run seed
npm start
```

### 2. Daily Development
```bash
npm run dev
# Make changes
# Server auto-restarts
```

### 3. After Code Changes
```bash
# If backend changes
# Server auto-restarts with nodemon

# If frontend changes
# Just refresh browser (Ctrl + R)
```

### 4. Re-seed Database
```bash
npm run seed
```

---

## Package.json Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node scripts/seedProducts.js"
}
```

---

## Environment Variables (.env)

```env
MONGO_URI=mongodb+srv://priyanshi:priyanshi%401301@cluster0.juihmrr.mongodb.net/ecommerce
JWT_SECRET=secret123
PORT=5000
```

---

## Quick Test Sequence

```bash
# 1. Start server
npm start

# 2. Open browser
http://localhost:5000

# 3. Register account
# Go to Register page
# Fill form and submit

# 4. Browse products
# See 30 products on home page

# 5. Add to cart
# Click "Add to Cart" on products

# 6. Checkout
# Go to Cart
# Click "Proceed to Checkout"
# Fill shipping details

# 7. View orders
# Go to Orders page
# See your order
```

---

## Documentation Files

```bash
README.md           # Main documentation
SETUP.md           # Setup guide
FEATURES.md        # Feature list
IMPROVEMENTS.md    # All improvements
TESTING.md         # Testing guide
PROJECT_SUMMARY.md # Project overview
COMMANDS.md        # This file
```

---

## Browser DevTools

### Open Console
```
F12 or Ctrl + Shift + I
```

### Check Network Requests
```
F12 → Network tab
```

### Check LocalStorage
```
F12 → Application → Local Storage
```

### Clear Cache
```
Ctrl + Shift + Delete
```

### Hard Refresh
```
Ctrl + Shift + R
```

---

## Production Deployment (Optional)

### Build for Production
```bash
# No build step needed for this project
# Just ensure .env is configured
```

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
```

### Deploy to Vercel
```bash
vercel
# Follow prompts
```

---

## Useful npm Commands

### Check Outdated Packages
```bash
npm outdated
```

### Update Packages
```bash
npm update
```

### Install Specific Package
```bash
npm install package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run seed` | Add 30 products to database |
| `npm start` | Start production server |
| `npm run dev` | Start development server |
| `Ctrl + C` | Stop server |
| `F5` | Refresh browser |
| `Ctrl + Shift + R` | Hard refresh browser |
| `F12` | Open DevTools |

---

**Keep this file handy for quick reference! 📌**
