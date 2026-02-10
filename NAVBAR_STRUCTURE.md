# 🧭 Navbar Structure - Complete Guide

## Consistent Navigation Across All Pages

All pages now have a properly arranged navbar with all navigation options.

---

## 📋 Standard Navbar (Not Logged In)

```
┌─────────────────────────────────────────────────────────┐
│  ShopEase  │  Home  │  Cart  │  Wishlist  │  Orders  │  Login  │
└─────────────────────────────────────────────────────────┘
```

### Pages with Standard Navbar:
- Home (`index.html`)
- Cart (`cart.html`)
- Wishlist (`wishlist.html`)
- Orders (`orders.html`)
- Product Details (`product.html`)
- Login (`login.html`)
- Register (`register.html`)

---

## 👤 User Navbar (Logged In as Regular User)

```
┌──────────────────────────────────────────────────────────────────┐
│  ShopEase  │  Home  │  Cart  │  Wishlist  │  Orders  │  Hi, John  │  Logout  │
└──────────────────────────────────────────────────────────────────┘
```

### Dynamic Changes:
- "Login" replaced with "Hi, [Username]"
- "Logout" link added
- Cart shows count: "Cart (3)"
- All navigation links remain accessible

---

## 👨‍💼 Admin Navbar (Logged In as Admin)

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ShopEase  │  Home  │  Cart  │  Wishlist  │  Orders  │  Admin  │  Hi, Admin  │  Logout  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Additional Features:
- "Admin" link appears (only for admin users)
- Access to admin dashboard
- All user features available
- Can manage products and orders

---

## 🎯 Navbar Features

### All Pages Include:
1. **Home** - Browse all products
2. **Cart** - Shopping cart (with item count)
3. **Wishlist** - Saved items
4. **Orders** - Order history
5. **Login/User Menu** - Authentication

### Dynamic Elements:
- Cart count badge (e.g., "Cart (3)")
- User greeting (e.g., "Hi, John")
- Admin link (only for admins)
- Logout option (when logged in)

### Active State:
- Current page highlighted with `.active` class
- Blue gradient background on active link

---

## 📄 Page-by-Page Navbar

### 1. Home Page (`index.html`)
```html
<nav class="navbar">
  <div class="logo">ShopEase</div>
  <ul class="nav-links" id="nav-links">
    <li><a href="index.html" class="active">Home</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="wishlist.html">Wishlist</a></li>
    <li><a href="orders.html">Orders</a></li>
    <li><a href="login.html" id="auth-link">Login</a></li>
  </ul>
</nav>
```

### 2. Cart Page (`cart.html`)
```html
<nav class="navbar">
  <div class="logo">ShopEase</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="cart.html" class="active">Cart</a></li>
    <li><a href="wishlist.html">Wishlist</a></li>
    <li><a href="orders.html">Orders</a></li>
    <li><a href="login.html" id="auth-link">Login</a></li>
  </ul>
</nav>
```

### 3. Wishlist Page (`wishlist.html`)
```html
<nav class="navbar">
  <div class="logo">ShopEase</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="wishlist.html" class="active">Wishlist</a></li>
    <li><a href="orders.html">Orders</a></li>
    <li><a href="login.html" id="auth-link">Login</a></li>
  </ul>
</nav>
```

### 4. Orders Page (`orders.html`)
```html
<nav class="navbar">
  <div class="logo">ShopEase</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="wishlist.html">Wishlist</a></li>
    <li><a href="orders.html" class="active">Orders</a></li>
    <li><a href="login.html" id="auth-link">Login</a></li>
  </ul>
</nav>
```

### 5. Admin Page (`admin.html`)
```html
<nav class="navbar">
  <div class="logo">ShopEase Admin</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="wishlist.html">Wishlist</a></li>
    <li><a href="orders.html">Orders</a></li>
    <li><a href="admin.html" class="active">Admin</a></li>
    <li><a href="#" onclick="logout()">Logout</a></li>
  </ul>
</nav>
```

### 6. Login/Register Pages
```html
<nav class="navbar">
  <div class="logo">ShopEase</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="wishlist.html">Wishlist</a></li>
    <li><a href="orders.html">Orders</a></li>
    <li><a href="login.html" class="active">Login</a></li>
  </ul>
</nav>
```

---

## 🔄 Dynamic Navbar Updates

### JavaScript Logic (All Pages)

```javascript
function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navLinks = document.querySelector(".nav-links");
  const authLink = document.getElementById("auth-link");
  
  if (token && user.name) {
    if (authLink) {
      const adminLink = user.role === "admin" 
        ? '<li><a href="admin.html">Admin</a></li>' 
        : '';
      
      authLink.parentElement.innerHTML = `
        ${adminLink}
        <li><span style="color: #38bdf8; padding: 10px 20px;">
          Hi, ${user.name}
        </span></li>
        <li><a href="#" onclick="logout()">Logout</a></li>
      `;
    }
  }
  
  updateCartCount();
}
```

### Cart Count Update

```javascript
async function updateCartCount() {
  if (!token) return;
  
  try {
    const response = await fetch(`${API_URL}/auth/cart`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await response.json();
    const count = data.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
      cartLink.textContent = `Cart (${count})`;
    }
  } catch (error) {
    console.error("Error updating cart count:", error);
  }
}
```

---

## 🎨 Navbar Styling

### CSS Classes

```css
.navbar {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 16px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-links a.active {
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%);
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
}
```

---

## 📱 Responsive Navbar

### Desktop (1024px+)
- All links visible
- Full spacing
- Horizontal layout

### Tablet (768px - 1023px)
- Compact spacing
- Smaller font size
- All links visible

### Mobile (< 768px)
- Minimal padding
- Smaller links
- May need hamburger menu (future enhancement)

---

## ✅ Navbar Checklist

All pages have:
- [x] Consistent structure
- [x] All 5 main links (Home, Cart, Wishlist, Orders, Login/User)
- [x] Active state highlighting
- [x] Dynamic user greeting
- [x] Admin link (for admins)
- [x] Cart count badge
- [x] Logout functionality
- [x] Responsive design

---

## 🎯 User Experience Flow

### Not Logged In:
```
Home → Cart → Wishlist → Orders → Login
  ↓       ↓        ↓         ↓        ↓
Redirects to login if trying to access protected features
```

### Logged In (User):
```
Home → Cart → Wishlist → Orders → Hi, John → Logout
  ↓       ↓        ↓         ↓         ↓          ↓
All features accessible                    Clears session
```

### Logged In (Admin):
```
Home → Cart → Wishlist → Orders → Admin → Hi, Admin → Logout
  ↓       ↓        ↓         ↓        ↓        ↓          ↓
All features + Admin dashboard                      Clears session
```

---

## 🔧 Customization

### To Add New Link:
1. Add to HTML navbar in all pages
2. Update `updateNavbar()` function if needed
3. Add active state for new page
4. Update this documentation

### To Change Order:
1. Rearrange `<li>` elements in HTML
2. Keep consistent across all pages
3. Test navigation flow

---

## 📊 Summary

✅ **Consistent Navigation**
- All pages have same navbar structure
- 5 main links always visible
- Dynamic updates based on user state

✅ **User-Friendly**
- Clear active state
- Cart count visible
- User greeting displayed
- Easy logout access

✅ **Role-Based**
- Admin link for admins only
- All users see same base navigation
- Protected features redirect to login

✅ **Professional Design**
- Sticky navbar
- Gradient background
- Smooth hover effects
- Responsive layout

**Perfect Navigation Experience! 🎉**
