// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAux7cqBj0xMfop5_wR4qwuhLZkTuVqdYk",
    authDomain: "la-teteria.firebaseapp.com",
    projectId: "la-teteria",
    storageBucket: "la-teteria.appspot.com",
    messagingSenderId: "435963041575",
    appId: "1:435963041575:web:a9fb9b1cd60fdf4d283b02",
    measurementId: "G-N5VX8EWF2Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,app,db} ;

