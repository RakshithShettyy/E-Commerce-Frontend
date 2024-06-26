// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh9lQNX30eaVKgSVc9Q9xN4mtErffAc-M",
  authDomain: "e-commerce-80ee6.firebaseapp.com",
  projectId: "e-commerce-80ee6",
  storageBucket: "e-commerce-80ee6.appspot.com",
  messagingSenderId: "822762654037",
  appId: "1:822762654037:web:322eb99496d575ab5e07dc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { doc, setDoc, getDoc, signInWithPopup };
