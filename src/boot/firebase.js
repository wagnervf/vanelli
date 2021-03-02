// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAfO9NAL6hDeh7Hs8Na0ASeymjhH3Hfda4",
  authDomain: "espacovanelli-f59bf.firebaseapp.com",
  projectId: "espacovanelli-f59bf",
  storageBucket: "espacovanelli-f59bf.appspot.com",
  messagingSenderId: "612293901942",
  appId: "1:612293901942:web:ec17f2a6fca27dfb2ca957",
  measurementId: "G-8FN0GMFMVG",
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
