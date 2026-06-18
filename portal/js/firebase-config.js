import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBjETh_8Wy2aqXJxW95xt-Waib2JqxTSU",
  authDomain: "valeris-edu-portal.firebaseapp.com",
  projectId: "valeris-edu-portal",
  storageBucket: "valeris-edu-portal.firebasestorage.app",
  messagingSenderId: "1085558997207",
  appId: "1:1085558997207:web:22eae8cc6a91fece60f092"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
