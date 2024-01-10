// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVUPX4F0spD_tkr8uMEoJ1043qF7jXdDQ",
  authDomain: "chasing-4e8d8.firebaseapp.com",
  projectId: "chasing-4e8d8",
  storageBucket: "chasing-4e8d8.appspot.com",
  messagingSenderId: "270451630378",
  appId: "1:270451630378:web:d1e962e27ca80419cbfe53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);