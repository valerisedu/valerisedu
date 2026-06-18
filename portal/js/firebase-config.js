import { initializeApp } from "https://www.gstatic.com/firebasejs/...";
import { getFirestore } from "...";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};

const app = initializeApp(firebaseConfig);

export { app };
