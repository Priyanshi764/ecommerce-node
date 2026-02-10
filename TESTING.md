# 🧪 Testing Guide - ShopEase

## Quick Start Testing

### 1. Start the Server
```bash
npm start
```

Server should start on: `http://localhost:5000`

### 2. Open in Browser
Navigate to: `http://localhost:5000`

---

## 📋 Test Scenarios

### Scenario 1: New User Registration & Shopping

#### Step 1: Register
1. Click "Login" in navbar
2. Click "Create an account"
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
4. Click "Register"
5. ✅ Should redirect to home page
6. ✅ Should see "Hi, John Doe" in navbar

#### Step 2: Browse Products
1. ✅ Should see 30 products on home page
2. ✅ Each product should have:
   - Image
   - Name
   - Price (₹)
   - Rating (⭐)
   - "Add to Cart" button

#### Step 3: Use Filters
1. **Search**: Type "wireless" in search box
   - ✅ Should show Wireless Headphones, Mouse, Earbuds, Speaker
2. **Category**: Select "Electronics"
   - ✅ Should show only electronics items
3. **Sort**: Select "Price: Low to High"
   - ✅ Products should be sorted by price

#### Step 4: Add to Cart
1. Click "Add to Cart" on 3 different products
2. ✅ Should see "Added to cart 🛒" alert
3. ✅ Cart count in navbar should show (3)

#### Step 5: View Cart
1. Click "Cart" in navbar
2. ✅ Should see all 3 items
3. ✅ Each item should show:
   - Image
   - Name
   - Price × Quantity
   - Quantity controls (+ / -)
   - Remove button
4. ✅ Total should be calculated correctly

#### Step 6: Modify Cart
1. Click "+" on first item
   - ✅ Quantity should increase
   - ✅ Total should update
2. Click "-" on second item
   - ✅ Quantity should decrease
   - ✅ Total should update
3. Click "Remove" on third item
   - ✅ Item should be removed
   - ✅ Total should update

#### Step 7: Checkout
1. Click "Proceed to Checkout"
2. Fill shipping details:
   - Full Name: `John Doe`
   - Phone: `9876543210`
   - Address: `123 Main Street`
   - City: `Mumbai`
   - State: `Maharashtra`
   - Pincode: `400001`
3. Click OK on all prompts
4. ✅ Should see "Order placed successfully 🎉"
5. ✅ Should redirect to Orders page

#### Step 8: View Orders
1. ✅ Should see your order
2. ✅ Order should show:
   - Order ID
   - Status badge (Pending)
   - Date
   - Total amount
   - Item thumbnails

---

### Scenario 2: Existing User Login

#### Step 1: Logout
1. Click "Logout" in navbar
2. ✅ Should redirect to login page

#### Step 2: Login
1. Enter:
   - Email: `john@example.com`
   - Password: `password123`
2. Click "Login"
3. ✅ Should redirect to home page
4. ✅ Should see "Hi, John Doe" in navbar

#### Step 3: Check Order History
1. Click "Orders" in navbar
2. ✅ Should see previous orders
3. ✅ Cart should be empty (cleared after checkout)

---

### Scenario 3: Product Search & Filter

#### Test Search
1. Search for "watch"
   - ✅ Should show Smart Watch Pro
2. Search for "shoes"
   - ✅ Should show Running Shoes, Canvas Sneakers
3. Search for "coffee"
   - ✅ Should show Coffee Maker
4. Clear search
   - ✅ Should show all products

#### Test Category Filter
1. Select "Fashion"
   - ✅ Should show 7 fashion items
2. Select "Home & Kitchen"
   - ✅ Should show 7 home items
3. Select "Sports"
   - ✅ Should show 3 sports items
4. Select "All Categories"
   - ✅ Should show all 30 products

#### Test Sort
1. Sort by "Price: Low to High"
   - ✅ First item should be Phone Stand (₹499)
   - ✅ Last item should be Air Purifier (₹6999)
2. Sort by "Price: High to Low"
   - ✅ Order should be reversed
3. Sort by "Top Rated"
   - ✅ Mechanical Keyboard (4.8) should be first
4. Sort by "Newest"
   - ✅ Should show default order

---

### Scenario 4: Mobile Responsive Testing

#### Desktop (1024px+)
1. ✅ Products in 4-5 columns
2. ✅ Filters in single row
3. ✅ Cart sidebar visible

#### Tablet (768px - 1023px)
1. ✅ Products in 3 columns
2. ✅ Filters stacked
3. ✅ Cart sidebar below items

#### Mobile (< 768px)
1. ✅ Products in 1-2 columns
2. ✅ Filters stacked vertically
3. ✅ Navbar compact
4. ✅ Touch-friendly buttons

---

## 🔍 API Testing (Optional)

### Using Postman or Thunder Client

#### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```
✅ Should return token and user object

#### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```
✅ Should return token and user object

#### 3. Get Products
```
GET http://localhost:5000/api/products
```
✅ Should return array of 30 products

#### 4. Get Products by Category
```
GET http://localhost:5000/api/products?category=Electronics
```
✅ Should return only electronics

#### 5. Search Products
```
GET http://localhost:5000/api/products?search=wireless
```
✅ Should return matching products

#### 6. Get Single Product
```
GET http://localhost:5000/api/products/{productId}
```
✅ Should return product details

#### 7. Place Order (Protected)
```
POST http://localhost:5000/api/orders/checkout
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "...",
      "name": "Product Name",
      "price": 2499,
      "quantity": 1,
      "image": "..."
    }
  ],
  "totalAmount": 2499,
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "paymentMethod": "COD"
}
```
✅ Should create order and reduce stock

#### 8. Get My Orders (Protected)
```
GET http://localhost:5000/api/orders/my-orders
Authorization: Bearer {your_token}
```
✅ Should return user's orders

---

## ✅ Checklist

### Visual Testing
- [ ] All images load correctly
- [ ] Colors match design (blue/purple gradients)
- [ ] Hover effects work on all cards
- [ ] Buttons have proper styling
- [ ] Navbar is sticky
- [ ] Footer is at bottom
- [ ] Responsive on mobile
- [ ] No layout breaks

### Functional Testing
- [ ] Registration works
- [ ] Login works
- [ ] Logout works
- [ ] Products load (30 items)
- [ ] Search works
- [ ] Category filter works
- [ ] Sort works
- [ ] Add to cart works
- [ ] Cart count updates
- [ ] Quantity controls work
- [ ] Remove from cart works
- [ ] Total calculates correctly
- [ ] Checkout works
- [ ] Orders display correctly
- [ ] Order status shows

### Error Handling
- [ ] Empty email/password shows alert
- [ ] Wrong credentials shows error
- [ ] Empty cart checkout prevented
- [ ] Network errors handled
- [ ] Missing images have fallback
- [ ] Invalid product ID handled

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Smooth animations
- [ ] No lag on interactions
- [ ] Images load progressively

---

## 🐛 Common Issues & Solutions

### Issue: Products not showing
**Solution**: Run `npm run seed` to populate database

### Issue: Can't login
**Solution**: 
1. Check MongoDB connection in `.env`
2. Verify server is running
3. Check browser console for errors

### Issue: Images not loading
**Solution**: 
1. Check internet connection (images from Unsplash)
2. Images have fallback to placeholder

### Issue: Cart not persisting
**Solution**: 
1. Check browser localStorage is enabled
2. Clear cache and try again

### Issue: Styling looks broken
**Solution**: 
1. Hard refresh (Ctrl + Shift + R)
2. Clear browser cache
3. Check CSS file loaded correctly

---

## 📊 Expected Results

### Database
- **Users**: 1+ registered users
- **Products**: 30 products
- **Orders**: Orders from testing

### Performance Metrics
- Page Load: < 2 seconds
- API Response: < 500ms
- Smooth 60fps animations

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 🎯 Success Criteria

✅ All 30 products visible
✅ Search returns correct results
✅ Filters work properly
✅ Cart functionality complete
✅ Checkout process smooth
✅ Orders tracked correctly
✅ Responsive on all devices
✅ No console errors
✅ Professional appearance

---

**Happy Testing! 🚀**
