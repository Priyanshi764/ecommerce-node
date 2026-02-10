# 🧪 Test New Features Guide

## Test 1: Cart Persistence After Logout ✅

### Steps:
1. **Register/Login**
   - Go to http://localhost:5000
   - Click "Login" → "Create an account"
   - Register with: test@example.com / password123

2. **Add Items to Cart**
   - Browse products on home page
   - Click "Add to Cart" on 3 different products
   - Verify cart count shows (3) in navbar

3. **View Cart**
   - Click "Cart" in navbar
   - Verify all 3 items are displayed
   - Note the items

4. **Logout**
   - Click "Logout" in navbar
   - You're redirected to login page

5. **Login Again**
   - Login with same credentials
   - test@example.com / password123

6. **Check Cart** ✅
   - Click "Cart" in navbar
   - **All 3 items should still be there!**
   - Cart persisted after logout/login

### Expected Result:
✅ Cart items remain after logout and login
✅ Quantities preserved
✅ Total amount correct

---

## Test 2: Wishlist Functionality ✅

### Steps:
1. **Login** (if not already)

2. **Add to Wishlist**
   - Go to home page
   - Click the 🤍 (heart) button on any product
   - Heart should turn to ❤️ (red)
   - Alert: "Added to wishlist ❤️"

3. **Add More Items**
   - Click heart on 2-3 more products
   - Each should show ❤️

4. **View Wishlist**
   - Click "Wishlist" in navbar
   - All wishlist items displayed

5. **Add to Cart from Wishlist**
   - Click "Add to Cart" on any wishlist item
   - Alert: "Added to cart 🛒"

6. **Remove from Wishlist**
   - Click "Remove" button
   - Item removed from wishlist

7. **Test Persistence**
   - Logout and login again
   - Go to Wishlist page
   - **Items still there!** ✅

### Expected Result:
✅ Heart button toggles on/off
✅ Wishlist page shows all items
✅ Can add to cart from wishlist
✅ Wishlist persists after logout

---

## Test 3: Admin Dashboard & Add Products ✅

### Steps:

#### A. Create Admin User
1. **Open MongoDB**
   ```bash
   mongosh "mongodb+srv://priyanshi:priyanshi%401301@cluster0.juihmrr.mongodb.net/ecommerce"
   ```

2. **Make User Admin**
   ```javascript
   db.users.updateOne(
     { email: "test@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Verify**
   ```javascript
   db.users.findOne({ email: "test@example.com" })
   // Should show role: "admin"
   ```

#### B. Access Admin Panel
1. **Logout and Login**
   - Logout from website
   - Login with admin account

2. **Access Admin**
   - You should see "Admin" link in navbar
   - Click "Admin" or go to http://localhost:5000/admin.html

3. **Verify Access**
   - Should see admin dashboard
   - Add Product form visible
   - Product list visible
   - Order list visible

#### C. Add New Product
1. **Fill Product Form**
   - Product Name: `Test Product`
   - Price: `1999`
   - Category: `Electronics`
   - Stock: `50`
   - Image URL: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500`
   - Description: `This is a test product added by admin`
   - Rating: `4.5`
   - Featured: ✓ (check)

2. **Submit Form**
   - Click "Add Product"
   - Alert: "Product added successfully! 🎉"
   - Form resets

3. **Verify Product Added**
   - Go to home page
   - Search for "Test Product"
   - **Product should appear!** ✅

4. **Check Database**
   ```javascript
   db.products.find({ name: "Test Product" })
   // Should show the new product
   ```

#### D. Manage Products
1. **View Products**
   - In admin panel, scroll to "Manage Products"
   - All products listed with images

2. **Delete Product**
   - Click "Delete" on test product
   - Confirm deletion
   - Product removed

### Expected Result:
✅ Admin can access admin panel
✅ Admin can add products via form
✅ Products immediately available
✅ Admin can delete products
✅ Admin can view all orders

---

## Test 4: Order Tracking ✅

### Steps:
1. **Place Order**
   - Add items to cart
   - Go to cart
   - Click "Proceed to Checkout"
   - Fill shipping details
   - Order placed

2. **View Orders**
   - Click "Orders" in navbar
   - See your order with status "Pending"

3. **Admin Update Status**
   - Login as admin
   - Go to admin panel
   - Find your order
   - Change status to "Processing"
   - Status updated

4. **User View Updated Status**
   - Login as regular user
   - Go to Orders page
   - **Status shows "Processing"** ✅

### Expected Result:
✅ Orders display with status
✅ Admin can update status
✅ User sees updated status
✅ Status badges color-coded

---

## Test 5: Stock Management ✅

### Steps:
1. **Check Stock**
   - View any product
   - Note stock count (e.g., "50 in stock")

2. **Add to Cart**
   - Add 5 quantity to cart

3. **Place Order**
   - Checkout with 5 items

4. **Check Stock Again**
   - View same product
   - **Stock reduced by 5** ✅
   - Now shows "45 in stock"

5. **Out of Stock Test**
   - Admin: Set product stock to 0
   - User: View product
   - "Add to Cart" button disabled
   - Shows "Out of Stock"

### Expected Result:
✅ Stock displays correctly
✅ Stock reduces after order
✅ Out of stock products disabled
✅ Prevents overselling

---

## Test 6: Search & Filter ✅

### Steps:
1. **Search**
   - Type "wireless" in search box
   - Shows: Headphones, Mouse, Earbuds, Speaker

2. **Category Filter**
   - Select "Electronics"
   - Shows only electronics items

3. **Sort**
   - Select "Price: Low to High"
   - Products sorted by price

4. **Combined**
   - Search "shoes"
   - Category "Fashion"
   - Sort "Top Rated"
   - Results filtered and sorted

### Expected Result:
✅ Search works in real-time
✅ Category filter accurate
✅ Sort options work
✅ Can combine filters

---

## Test 7: Reviews System (API Ready) ✅

### Test via API:
```bash
# Add Review
curl -X POST http://localhost:5000/api/products/{productId}/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{
    "rating": 5,
    "comment": "Excellent product!"
  }'
```

### Expected Result:
✅ Review added to product
✅ Average rating updated
✅ User name stored with review

---

## Quick Checklist

Test each feature and check off:

- [ ] Cart persists after logout/login
- [ ] Wishlist add/remove works
- [ ] Wishlist persists after logout
- [ ] Admin can access admin panel
- [ ] Admin can add products via form
- [ ] New products appear on site
- [ ] Admin can delete products
- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Stock reduces after order
- [ ] Out of stock products disabled
- [ ] Search works
- [ ] Category filter works
- [ ] Sort options work
- [ ] Order tracking displays status
- [ ] Reviews API works

---

## Common Issues & Solutions

### Issue: Can't access admin panel
**Solution**: Make sure user role is "admin" in database

### Issue: Cart not persisting
**Solution**: Check if logged in (cart requires authentication)

### Issue: Products not showing
**Solution**: Run `npm run seed` to add products

### Issue: Can't add products as admin
**Solution**: Verify admin role and token is valid

---

## Success Criteria

✅ All features working
✅ Cart persists after logout
✅ Admin can add products
✅ Wishlist functional
✅ Orders tracked
✅ Stock managed
✅ No console errors

---

**All features tested and working! 🎉**
