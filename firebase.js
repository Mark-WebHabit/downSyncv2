// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPaH2uRo109aq5eapq4za1R_wM0VQo6TQ",
  authDomain: "downsync-658dc.firebaseapp.com",
  databaseURL: "https://downsync-658dc-default-rtdb.firebaseio.com",
  projectId: "downsync-658dc",
  storageBucket: "downsync-658dc.firebasestorage.app",
  messagingSenderId: "407513212060",
  appId: "1:407513212060:web:e2224f91d5bbe21672f959",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
