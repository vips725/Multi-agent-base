// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cotexai-83ca1.firebaseapp.com",
  projectId: "cotexai-83ca1",
  storageBucket: "cotexai-83ca1.firebasestorage.app",
  messagingSenderId: "157168624675",
  appId: "1:157168624675:web:53ef573540b63be6003d96",
  measurementId: "G-13V294VQZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();