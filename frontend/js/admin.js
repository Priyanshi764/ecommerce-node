const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

// Check if user is admin
if (!token || user.role !== "admin") {
  alert("Access denied. Admin only.");
  window.location.href = "index.html";
}

// Add Product Form
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById("product-name").value,
    price: Number(document.getElementById("product-price").value),
    category: document.getElementById("product-category").value,
    stock: Number(document.getElementById("product-stock").value),
    image: document.getElementById("product-image").value,
    description: document.getElementById("product-description").value,
    rating: Number(document.getElementById("product-rating").value),
    featured: document.getElementById("product-featured").checked
  };

  try {
    const response = await fetch(`${API_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      alert("Product added successfully! 🎉");
      document.getElementById("add-product-form").reset();
      loadProducts();
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add product");
    }
  } catch (error) {
    alert("Unable to add product. Please try again.");
  }
});

// Load Products
async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayProducts(products) {
  const productsList = document.getElementById("admin-products-list");

  if (!products || products.length === 0) {
    productsList.innerHTML = "<p>No products found</p>";
    return;
  }

  productsList.innerHTML = products.map(product => `
    <div class="admin-product-item">
      <img src="${product.image}" alt="${product.name}">
      <div class="admin-product-info">
        <h4>${product.name}</h4>
        <p>₹${product.price} | Stock: ${product.stock} | Category: ${product.category}</p>
        <p class="rating">⭐ ${product.rating.toFixed(1)} | ${product.featured ? '⭐ Featured' : ''}</p>
      </div>
      <div class="admin-product-actions">
        <button onclick="editProduct('${product._id}')" class="btn-edit">Edit</button>
        <button onclick="deleteProduct('${product._id}')" class="btn-delete">Delete</button>
      </div>
    </div>
  `).join("");
}

async function deleteProduct(productId) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert("Product deleted successfully");
      loadProducts();
    } else {
      alert("Failed to delete product");
    }
  } catch (error) {
    alert("Unable to delete product");
  }
}

function editProduct(productId) {
  alert("Edit functionality: Navigate to edit page or open modal");
  // You can implement edit modal or redirect to edit page
}

// Load Orders
async function loadOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const orders = await response.json();
    displayOrders(orders);
  } catch (error) {
    console.error("Error loading orders:", error);
  }
}

function displayOrders(orders) {
  const ordersList = document.getElementById("admin-orders-list");

  if (!orders || orders.length === 0) {
    ordersList.innerHTML = "<p>No orders found</p>";
    return;
  }

  ordersList.innerHTML = orders.slice(0, 10).map(order => `
    <div class="admin-order-item">
      <div class="admin-order-header">
        <h4>Order #${order._id.slice(-8)}</h4>
        <select onchange="updateOrderStatus('${order._id}', this.value)" class="status-select">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
          <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
          <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </div>
      <p>Date: ${new Date(order.createdAt).toLocaleDateString()} | Total: ₹${order.totalAmount}</p>
      <p>Items: ${order.items.length} | Customer: ${order.shippingAddress?.fullName || 'N/A'}</p>
    </div>
  `).join("");
}

async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      alert("Order status updated successfully");
      loadOrders();
    } else {
      alert("Failed to update order status");
    }
  } catch (error) {
    alert("Unable to update order status");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Initialize
loadProducts();
loadOrders();
