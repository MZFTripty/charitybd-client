// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
  
const firebaseConfig = {
  apiKey: "AIzaSyB117PWw0bBhcHAa1K3NPZdyhBKVB8nD6I",
  authDomain: "charity-ac9dc.firebaseapp.com",
  projectId: "charity-ac9dc",
  storageBucket: "charity-ac9dc.appspot.com",
  messagingSenderId: "407457638714",
  appId: "1:407457638714:web:a6d7febe921d3f604e8803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);