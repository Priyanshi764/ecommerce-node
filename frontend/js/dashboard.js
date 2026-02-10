/* AUTH CHECK */
const token = localStorage.getItem("token");
if (!token) {
  alert("Please login to continue");
  window.location.href = "login.html";
}

/* LOAD PRODUCTS */
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (!products.length) {
      productList.innerHTML = "<p>No products available</p>";
      return;
    }

    products.forEach(product => {
      productList.innerHTML += `
        <div class="product-card">
          <img src="${product.image}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick="openProduct('${product._id}')">View</button>
        </div>
      `;
    });
  })
  .catch(() => {
    alert("Unable to load products");
  });

function openProduct(id) {
  localStorage.setItem("productId", id);
  window.location.href = "product.html";
}
