const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to view orders");
  window.location.href = "login.html";
}

async function loadOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders/my-orders", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const orders = await response.json();
    displayOrders(orders);
  } catch (error) {
    document.getElementById("orders-list").innerHTML = "<p>Unable to load orders</p>";
  }
}

function displayOrders(orders) {
  const ordersList = document.getElementById("orders-list");

  if (!orders || orders.length === 0) {
    ordersList.innerHTML = "<p>No orders found</p>";
    return;
  }

  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <h3>Order #${order._id.slice(-8)}</h3>
        <span class="status-badge status-${order.status}">${order.status}</span>
      </div>
      <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Total: ₹${order.totalAmount}</p>
      <p>Items: ${order.items.length}</p>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} × ${item.quantity}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navLinks = document.querySelector(".nav-links");
  
  if (token && user.name) {
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.parentElement.innerHTML = `
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
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

updateNavbar();
loadOrders();
