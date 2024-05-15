// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "slpd-code-project.firebaseapp.com",
  projectId: "slpd-code-project",
  storageBucket: "slpd-code-project.appspot.com",
  messagingSenderId: "879972319126",
  appId: "1:879972319126:web:1d708d70adae71f71627b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);