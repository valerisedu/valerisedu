import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBjETh_8Wy2aqXJxW95xt-Waib2JqxTSU",
  authDomain: "valeris-edu-portal.firebaseapp.com",
  projectId: "valeris-edu-portal",
  storageBucket: "valeris-edu-portal.firebasestorage.app",
  messagingSenderId: "1085558997207",
  appId: "1:1085558997207:web:22eae8cc6a91fece60f092",
  measurementId: "G-7EJCQ925HW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLb0IPoZDBhY_-nlwwztoSK4dWvPKnmvMBILROsEnN7_bJ414DGh7aus18dO6-DKkd/exec";
