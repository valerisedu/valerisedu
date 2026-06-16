import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("loginError");

function showError(message){
  errorBox.classList.add("show");
  errorBox.textContent = message;
}

function hideError(){
  errorBox.classList.remove("show");
  errorBox.textContent = "";
}

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  hideError();

  const studentId = document
    .getElementById("studentId")
    .value
    .trim()
    .toUpperCase();

  const password = document
    .getElementById("password")
    .value;

  if(!studentId || !password){
    showError("Please enter Student ID and Password");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing In...";

  try {

    let email;

    if(studentId.includes("@")){
      email = studentId;
    } else {
      email = `${studentId}@students.valerisedu.com`;
    }

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if(email === "admin@valerisedu.com"){
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } catch(error){

    console.error(error);

    showError(
      "Invalid Student ID or Password"
    );

  }

  loginBtn.disabled = false;
  loginBtn.textContent = "Sign In";

});
