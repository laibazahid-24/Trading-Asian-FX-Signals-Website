const API_BASE_URL = "http://127.0.0.1:8000";
const statusMsg = document.getElementById("statusMsg");

function showStatus(message, type = "error") {
  if (!statusMsg) return;
  statusMsg.innerText = message;
  statusMsg.className = `status-msg status-${type}`;
  statusMsg.style.display = "block";
}

const passwordField = document.getElementById("passwordField");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordField) {
  togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      togglePassword.src = "images/eye icon.png";
    } else {
      passwordField.type = "password";
      togglePassword.src = "images/eye icon.png";
    }
  });
}

document.getElementById("loginBtn")?.addEventListener("click", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("passwordField").value;

  if (!email || !password) {
    showStatus("Please enter both email and password.");
    return;
  }

  showStatus("Signing in...", "success");

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_name", data.name);
      localStorage.setItem("user_email", data.email);

      window.location.href = "dashboard.html";
    } else {
      showStatus(data.detail || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    showStatus("An error occurred during login. Please try again later.");
    console.error("Error during login:", error);
  }
});

document.getElementById("forgotBtn")?.addEventListener("click", async () => {
  // Forget password popup removed as requested.
  return;
});