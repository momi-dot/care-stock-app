import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "ここに貼る",
  authDomain: "ここに貼る",
  projectId: "ここに貼る",
  storageBucket: "ここに貼る",
  messagingSenderId: "ここに貼る",
  appId: "ここに貼る"
};

const app = initializeApp(firebaseConfig);

export default app;
