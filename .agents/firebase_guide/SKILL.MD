// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0l6qT-z56eQUMQgW6CbNbYwB1ZJmMzOk",
  authDomain: "readingtool-b2124.firebaseapp.com",
  projectId: "readingtool-b2124",
  storageBucket: "readingtool-b2124.firebasestorage.app",
  messagingSenderId: "981193866014",
  appId: "1:981193866014:web:7460f57861256cceb4270f",
  measurementId: "G-X7Y8622DZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);