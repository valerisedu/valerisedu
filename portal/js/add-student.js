// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBjETh_8Wy2aqXJxW95xt-Waib2JqxTSU",
  authDomain: "valeris-edu-portal.firebaseapp.com",
  projectId: "valeris-edu-portal",
  storageBucket: "valeris-edu-portal.firebasestorage.app",
  messagingSenderId: "1085558997207",
  appId: "1:1085558997207:web:22eae8cc6a91fece60f092",
  measurementId: "G-7EJCQ925HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
