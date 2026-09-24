import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr8qurxO07-f9JckkFu_b0QyzgUhVz9f0",
  authDomain: "marcos-the-grand-fleet.firebaseapp.com",
  projectId: "marcos-the-grand-fleet",
  storageBucket: "marcos-the-grand-fleet.firebasestorage.app",
  messagingSenderId: "142942945289",
  appId: "1:142942945289:web:e9a544da5d6bf0685bf8d8",
  measurementId: "G-YHP0HK69RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };

// Initialize and export Firebase Authentication
export const auth = getAuth(app);