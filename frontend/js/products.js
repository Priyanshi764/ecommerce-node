const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

let allProducts = [];
let currentCategory = "all";
let currentSort = "newest";
let wishlistIds = [];

// Load products
async function loadProducts() {
  try {
    const params = new URLSearchParams();
    if (currentCategory !== "all") params.append("category", currentCategory);
    if (currentSort) params.append("sort", currentSort);

    const response = await fetch(`${API_URL}/products?${params}`);
    allProducts = await response.json();
    
    // Load wishlist if logged in
    if (token) {
      await loadWishlist();
    }
    
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("product-list").innerHTML = "<p>Unable to load products</p>";
  }
}

async function loadWishlist() {
  try {
    const response = await fetch(`${API_URL}/auth/wishlist`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    wishlistIds = data.wishlist.map(p => p._id);
  } catch (error) {
    console.error("Error loading wishlist:", error);
  }
}

// Display products
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  
  if (!products || products.length === 0) {
    productList.innerHTML = "<p>No products found</p>";
    return;
  }

  productList.innerHTML = products.map(product => {
    const isInWishlist = wishlistIds.includes(product._id);
    return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
        ${token ? `
          <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist('${product._id}', event)">
            ${isInWishlist ? '❤️' : '🤍'}
          </button>
        ` : ''}
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <div class="rating">⭐ ${product.rating.toFixed(1)}</div>
        <p class="stock-info">${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
        <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}')" 
                ${product.stock === 0 ? 'disabled' : ''}>
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    `;
  }).join("");
}

// Add to cart
async function addToCart(id, name, price, image) {
  if (!token) {
    alert("Please login to add items to cart");
    window.location.href = "login.html";
    return;
  }

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
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add to cart");
    }
  } catch (error) {
    alert("Unable to add to cart");
  }
}

// Toggle wishlist
async function toggleWishlist(productId, event) {
  event.stopPropagation();
  
  if (!token) {
    alert("Please login to add to wishlist");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/wishlist/${productId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      wishlistIds = data.wishlist;
      displayProducts(allProducts);
      alert(wishlistIds.includes(productId) ? "Added to wishlist ❤️" : "Removed from wishlist");
    }
  } catch (error) {
    alert("Unable to update wishlist");
  }
}

// Update cart count in navbar
async function updateCartCount() {
  if (!token) return;
  
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

// Search products
function searchProducts(query) {
  if (!query) {
    displayProducts(allProducts);
    return;
  }
  
  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
  
  displayProducts(filtered);
}

// Filter by category
function filterByCategory(category) {
  currentCategory = category;
  loadProducts();
}

// Sort products
function sortProducts(sortType) {
  currentSort = sortType;
  loadProducts();
}

// Update navbar with user info
function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navLinks = document.querySelector(".nav-links");
  const authLink = document.getElementById("auth-link");
  
  if (token && user.name) {
    // Replace Login link with user menu
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

// Initialize
updateNavbar();
loadProducts();
