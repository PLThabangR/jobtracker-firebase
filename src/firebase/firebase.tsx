// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey:import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  // authDomain:import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL:import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
 
  // projectId:import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket:import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId:import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  // measurementId:import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID

  apiKey: "AIzaSyDN1k7R9IxxEBKJznIaWosTJ5I-HJSuF70",
  authDomain: "job-tracker-436f9.firebaseapp.com",
  databaseURL: "https://job-tracker-436f9-default-rtdb.firebaseio.com",
  projectId: "job-tracker-436f9",
  storageBucket: "job-tracker-436f9.firebasestorage.app",
  messagingSenderId: "666832603711",
  appId: "1:666832603711:web:d0e270731942070d9d868a",
  measurementId: "G-WSXEYWPCD3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service

