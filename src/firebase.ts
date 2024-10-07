// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "talktube-901ef.firebaseapp.com",
  projectId: "talktube-901ef",
  storageBucket: "talktube-901ef.appspot.com",
  messagingSenderId: "535016711792",
  appId: "1:535016711792:web:ea458e7af675e306f376b5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);
