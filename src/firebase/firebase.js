// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBG-pyiDMJHAWTQXfSZTlvgJmx-_UeObFg",
  authDomain: "food-order-b7c42.firebaseapp.com",
  projectId: "food-order-b7c42",
  storageBucket: "food-order-b7c42.firebasestorage.app",
  messagingSenderId: "848480754414",
  appId: "1:848480754414:web:59e5a252f83584e29fb1ff",
  measurementId: "G-4W4ZM50MQJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
