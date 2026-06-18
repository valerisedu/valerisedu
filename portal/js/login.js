import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("loginError");

function showError(message) {
  errorBox.classList.add("show");
  errorBox.textContent = message;
}

function hideError() {
  errorBox.classList.remove("show");
  errorBox.textContent = "";
}

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  hideError();

  const username = document
    .getElementById("studentId")
    .value
    .trim();

  const password = document
    .getElementById("password")
    .value;

  if (!username || !password) {
    showError("Please enter Username/Email and Password");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing In...";

  try {

    let email = username;

    if (!username.includes("@")) {
      email = `${username.toLowerCase()}@students.valerisedu.com`;
    }

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (
      email.toLowerCase() ===
      "connect@valerisedu.com"
    ) {

      window.location.href =
        "admin-dashboard.html";

    } else {

      window.location.href =
        "dashboard.html";

    }

  } catch (error) {

    console.error(error);

    showError(
      "Invalid Username/Email or Password"
    );

  }

  loginBtn.disabled = false;
  loginBtn.textContent = "Sign In";

});
