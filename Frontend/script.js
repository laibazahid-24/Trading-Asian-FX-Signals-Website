const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Redundant validation blocks removed as requested.

// ================= PROFIT CALCULATOR =================

const investmentEl = document.querySelector(".pc-field:nth-child(1) span");
const returnEl = document.querySelector(".pc-field:nth-child(2) span");
const durationEl = document.querySelector(".pc-field:nth-child(3) span");

const totalEl = document.querySelector(".pc-box.gold h3");
const profitEl = document.querySelector(".pc-box:nth-child(2) h3");
const yourEl = document.querySelector(".pc-box.green h3");
const ourEl = document.querySelector(".pc-box.dim h3");

// default values
let investment = 10000;
let monthlyReturn = 8;
let months = 6;

function calculateProfit() {

  let total = investment * Math.pow((1 + monthlyReturn / 100), months);
  let profit = total - investment;

  let yourShare = profit * 0.65;
  let ourShare = profit * 0.35;

  totalEl.innerText = "$" + total.toFixed(2);
  profitEl.innerText = "$" + profit.toFixed(2);
  yourEl.innerText = "$" + yourShare.toFixed(2);
  yourEl.innerText = "$" + yourShare.toFixed(2);
  ourEl.innerText = "$" + ourShare.toFixed(2);

}

// run once
calculateProfit();
// FORM SUBMIT HANDLE
const form = document.getElementById("consultForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const statusMsg = document.getElementById("consultStatus");

  function showStatus(message, type = "error") {
    if (!statusMsg) return;
    statusMsg.innerText = message;
    statusMsg.className = `status-msg status-${type}`;
    statusMsg.style.display = "block";
  }

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailAddress").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fullName || !email) {
    showStatus("Please fill in both Full Name and Email Address.");
    return;
  }

  showStatus("Sending your message...", "success");

  fetch("http://127.0.0.1:8000/consultation/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: fullName,
      email: email,
      phone: phone,
      message: message
    })
  })
    .then((res) => res.json())
    .then((data) => {
      showStatus("Message sent successfully!", "success");
      // localStorage yahan rakho

      // localStorage yahan rakho
      localStorage.setItem("email", email);

      form.reset();
    })
    .catch((err) => {
      showStatus("Error sending message. Please try again.");
      console.log(err);
    });
});
