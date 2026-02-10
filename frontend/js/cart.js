/* CART.JS - Database Synced */

const API_URL = "https://ecommerce-node-ri69.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to view cart");
  window.location.href = "login.html";
}

async function loadCart() {
  try {
    const response = await fetch(`${API_URL}/auth/cart`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    displayCart(data.cart);
  } catch (error) {
    console.error("Error loading cart:", error);
    document.getElementById("cart-items").innerHTML = "<p>Unable to load cart</p>";
  }
}

function displayCart(cart) {
  const cartItems = document.getElementById("cart-items");
  const totalDiv = document.getElementById("total");

  if (!cartItems || !totalDiv) return;

  if (!cart || cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalDiv.innerText = "Total: ₹0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        <div style="flex: 1;">
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <button onclick="updateQuantity('${item.productId}', ${item.quantity - 1})" style="padding: 5px 10px;">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity('${item.productId}', ${item.quantity + 1})" style="padding: 5px 10px;">+</button>
          <button onclick="removeItem('${item.productId}')" style="padding: 5px 10px; background: #ef4444;">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  totalDiv.innerText = `Total: ₹${total}`;
}

async function updateQuantity(productId, newQuantity) {
  try {
    const response = await fetch(`${API_URL}/auth/cart/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: newQuantity })
    });

    if (response.ok) {
      const data = await response.json();
      displayCart(data.cart);
      updateCartCount();
    }
  } catch (error) {
    alert("Unable to update quantity");
  }
}

async function removeItem(productId) {
  try {
    const response = await fetch(`${API_URL}/auth/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      displayCart(data.cart);
      updateCartCount();
    }
  } catch (error) {
    alert("Unable to remove item");
  }
}

async function checkout() {
  try {
    const cartResponse = await fetch(`${API_URL}/auth/cart`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const cartData = await cartResponse.json();
    const cart = cartData.cart;

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Simple checkout - in production, add shipping form
    const shippingAddress = {
      fullName: prompt("Enter your full name:"),
      phone: prompt("Enter your phone number:"),
      address: prompt("Enter your address:"),
      city: prompt("Enter your city:"),
      state: prompt("Enter your state:"),
      pincode: prompt("Enter your pincode:")
    };

    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      alert("Please fill all shipping details");
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: total,
      shippingAddress,
      paymentMethod: "COD"
    };

    const response = await fetch(`${API_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully 🎉");
      
      // Clear cart in database
      await fetch(`${API_URL}/auth/cart/clear`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      window.location.href = "orders.html";
    } else {
      alert(data.message || "Order failed");
    }
  } catch (error) {
    alert("Unable to place order. Please try again.");
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
loadCart();
