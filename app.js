npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBwab5_hc0pM9qCLTw7jZu4K6fSl_5xw",
  authDomain: "examprep-platform-219c3.firebaseapp.com",
  projectId: "examprep-platform-219c3",
  storageBucket: "examprep-platform-219c3.firebasestorage.app",
  messagingSenderId: "376405485969",
  appId: "1:376405485969:web:3eff3371d47852ed869230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);