const options = document.querySelectorAll(".verify-option");

options.forEach(option => {
  option.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    option.classList.add("active");
  });
});

document.querySelector(".continue-btn").addEventListener("click", () => {
  const selectedHeader = document.querySelector(".verify-option.active h4");
  const selected = selectedHeader ? selectedHeader.innerText : null;

  if (!selected) {
    return;
  }

  if (selected === "Email Verification") {
    window.location.href = "login.html";
  } else {
    window.location.href = "otp.html";
  }
});