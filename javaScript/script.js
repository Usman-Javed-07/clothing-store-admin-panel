
function showModalMessage(message) {
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  const modal = new bootstrap.Modal(document.getElementById("messageModal"));
  modal.show();
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  return regex.test(password);
}

function validateName(name) {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
}

function showValidationMessage(elementId, message) {
  const messageElement = document.getElementById(`${elementId}Message`);
  messageElement.textContent = message;
  messageElement.style.color = "red";
}

function clearValidationMessage(elementId) {
  const messageElement = document.getElementById(`${elementId}Message`);
  messageElement.textContent = "";
}

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function checkAuthentication() {
  const token = localStorage.getItem("token");

  if (!token) {
    showModalMessage("Please login first!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
    return false;
  }

  const decodedToken = decodeToken(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken && decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    showModalMessage("Session expired. Please login again.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
    return false;
  }

  return true;
}

document
  .getElementById("loginForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) {
      showModalMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      showModalMessage(
        "Password must be at least 6 characters, include special character, and number."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        showModalMessage("Login successful!");
        setTimeout(() => {
          window.location.href = "clothing.html";
        }, 1000);
      } else {
        showModalMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  });

document
  .getElementById("signupForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;

    if (!validateEmail(email)) {
      showModalMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      showModalMessage(
        "Password must be at least 6 characters, include special character, and number."
      );
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      showModalMessage("Passwords do not match.");
      return;
    }

    if (!validateName(firstname)) {
      showModalMessage("First name can only contain alphabetic characters.");
      return;
    }

    if (!validateName(lastname)) {
      showModalMessage("Last name can only contain alphabetic characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showModalMessage("Signup successful! Please login.");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      } else {
        showModalMessage(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  });

window.onload = function () {
  if (
    window.location.pathname === "/admin/clothing.html" ||
    window.location.pathname === "/admin/createNewProduct.html" ||
    window.location.pathname === "/admin/orderDetails.html"
  ) {
    if (!checkAuthentication()) {
      return;
    }
  }
};
