import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9bcW_pZIzXD9PveGTfwggjSmULR00BcM",
  authDomain: "care-stock-app.firebaseapp.com",
  projectId: "care-stock-app",
  storageBucket: "care-stock-app.firebasestorage.app",
  messagingSenderId: "524948478544",
  appId: "1:524948478544:web:3e24cb57f18148477a4f55"
};

const app = initializeApp(firebaseConfig);

export default app;
