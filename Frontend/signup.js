document.addEventListener("DOMContentLoaded", function () {

  // ===== PASSWORD TOGGLE =====
  const signupPassword = document.getElementById("signupPassword");
  const toggleSignupPassword = document.getElementById("toggleSignupPassword");

  if (signupPassword && toggleSignupPassword) {
    toggleSignupPassword.addEventListener("click", function () {
      signupPassword.type =
        signupPassword.type === "password" ? "text" : "password";
    });
  }

  // ===== CONFIG =====
  const API_BASE_URL = "http://127.0.0.1:8000";

  // ===== SIGNUP BUTTON =====
  const signupBtn = document.getElementById("signupBtn");
  const statusMsg = document.getElementById("statusMsg");

  function showStatus(message, type = "error") {
    if (!statusMsg) return;
    statusMsg.innerText = message;
    statusMsg.className = `status-msg status-${type}`;
    statusMsg.style.display = "block";
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", async function (e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = signupPassword.value;

      if (!name || !email || !password) {
        showStatus("Please fill in all required fields.");
        return;
      }

      showStatus("Creating account...", "success");

      try {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          // Save email temporarily for OTP verification if needed
          localStorage.setItem("verify_email", email);
          window.location.href = "verify.html";
        } else {
          showStatus(data.detail || data.error || "Signup failed. Please try again.");
          console.error("Signup error details:", data);
        }
      } catch (error) {
        showStatus("An error occurred. Please check your connection.");
        console.error("Network or catch during signup:", error);
      }
    });
  } else {
    console.log("signupBtn NOT found");
  }

});