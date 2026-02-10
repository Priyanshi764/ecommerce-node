const API_URL = "http://localhost:5000/api/auth";

/* TOGGLE ADMIN CODE FIELD */
function toggleAdminCode() {
  const checkbox = document.getElementById("register-as-admin");
  const adminCodeField = document.getElementById("admin-code");
  const adminHint = document.querySelector(".admin-hint");
  
  if (checkbox && checkbox.checked) {
    if (adminCodeField) adminCodeField.style.display = "block";
    if (adminHint) adminHint.style.display = "block";
  } else {
    if (adminCodeField) {
      adminCodeField.style.display = "none";
      adminCodeField.value = "";
    }
    if (adminHint) adminHint.style.display = "none";
  }
}

/* LOGIN */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful 🎉");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Invalid credentials");
    }
  })
  .catch(() => {
    alert("Unable to login. Please try again later.");
  });
}

/* REGISTER */
function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const registerAsAdmin = document.getElementById("register-as-admin");
  const adminCode = document.getElementById("admin-code");

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Check if registering as admin
  let role = "user";
  if (registerAsAdmin && registerAsAdmin.checked) {
    const code = adminCode ? adminCode.value.trim() : "";
    if (code !== "ADMIN2026") {
      alert("Invalid admin code! ❌");
      return;
    }
    role = "admin";
  }

  fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      if (role === "admin") {
        alert("Admin account created successfully! 🎉👨‍💼");
      } else {
        alert("Registration successful! 🎉");
      }
      
      window.location.href = "index.html";
    } else {
      alert(data.message || "Registration failed");
    }
  })
  .catch(() => {
    alert("Unable to register. Please try again later.");
  });
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("Logged out successfully");
  window.location.href = "login.html";
}
