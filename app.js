// 1. Import Firebase using web links (CDN) instead of npm
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBwab5_hc0pM9qCLTw7jZu4K6fSl_5xw",
  authDomain: "examprep-platform-219c3.firebaseapp.com",
  projectId: "examprep-platform-219c3",
  storageBucket: "examprep-platform-219c3.firebasestorage.app",
  messagingSenderId: "376405485969",
  appId: "1:376405485969:web:3eff3371d47852ed869230"
};

// 3. Initialize Firebase and the Database
const app = initializeApp(firebaseConfig);

// 4. Export the database so the rest of your app can use it
export const db = getFirestore(app);