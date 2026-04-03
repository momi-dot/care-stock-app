import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "←貼る",
  authDomain: "←貼る",
  projectId: "care-stock-app",
  storageBucket: "←貼る",
  messagingSenderId: "←貼る",
  appId: "←貼る"
};

const app = initializeApp(firebaseConfig);

export default app;
