// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLv2w5DhwvHfN6NDAmd0u_xJyXSHp0v2U",
  authDomain: "greendly.firebaseapp.com",
  projectId: "greendly",
  storageBucket: "greendly.appspot.com",
  messagingSenderId: "749114756416",
  appId: "1:749114756416:web:22ef4316220127ef317ea5",
  measurementId: "G-8F9P3GEKDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app); 

export { app, auth }