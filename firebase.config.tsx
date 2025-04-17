// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvY1z6nN1iebeqU9cleZTKDde_Bu_lUlw",
  authDomain: "test-5b9a5.firebaseapp.com",
  projectId: "test-5b9a5",
  storageBucket: "test-5b9a5.firebasestorage.app",
  messagingSenderId: "714536672820",
  appId: "1:714536672820:web:d9d5b2c2e109b45f4d3461",
  measurementId: "G-W0QCPS6EL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);