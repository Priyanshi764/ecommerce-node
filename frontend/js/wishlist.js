const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to view wishlist");
  window.location.href = "login.html";
}

async function loadWishlist() {
  try {
    const response = await fetch(`${API_URL}/auth/wishlist`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    displayWishlist(data.wishlist);
  } catch (error) {
    console.error("Error loading wishlist:", error);
    document.getElementById("wishlist-items").innerHTML = "<p>Unable to load wishlist</p>";
  }
}

function displayWishlist(products) {
  const wishlistItems = document.getElementById("wishlist-items");

  if (!products || products.length === 0) {
    wishlistItems.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  wishlistItems.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <div class="rating">⭐ ${product.rating.toFixed(1)}</div>
      <div style="display: flex; gap: 10px;">
        <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}')" style="flex: 1;">Add to Cart</button>
        <button onclick="removeFromWishlist('${product._id}')" style="background: #ef4444;">Remove</button>
      </div>
    </div>
  `).join("");
}

async function addToCart(id, name, price, image) {
  try {
    const response = await fetch(`${API_URL}/auth/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ productId: id, name, price, image, quantity: 1 })
    });

    if (response.ok) {
      alert("Added to cart 🛒");
      updateCartCount();
    }
  } catch (error) {
    alert("Unable to add to cart");
  }
}

async function removeFromWishlist(productId) {
  try {
    const response = await fetch(`${API_URL}/auth/wishlist/${productId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert("Removed from wishlist");
      loadWishlist();
    }
  } catch (error) {
    alert("Unable to remove from wishlist");
  }
}

async function updateCartCount() {
  try {
    const response = await fetch(`${API_URL}/auth/cart`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
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

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navLinks = document.querySelector(".nav-links");
  const authLink = document.getElementById("auth-link");
  
  if (token && user.name) {
    if (authLink) {
      const adminLink = user.role === "admin" ? '<li><a href="admin.html">Admin</a></li>' : '';
      authLink.parentElement.innerHTML = `
        ${adminLink}
        <li><span style="color: #38bdf8; padding: 10px 20px;">Hi, ${user.name}</span></li>
        <li><a href="#" onclick="logout()">Logout</a></li>
      `;
    }
  }
  
  updateCartCount();
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

updateNavbar();
loadWishlist();
