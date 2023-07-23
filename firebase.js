// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyANSa8uxmk_BHeVUzuEV8VzAr0iH0hxTtw",
  authDomain: "netflixuireactnative.firebaseapp.com",
  projectId: "netflixuireactnative",
  storageBucket: "netflixuireactnative.appspot.com",
  messagingSenderId: "386489254346",
  appId: "1:386489254346:web:0ead68c77e8a7227e04f33",
  measurementId: "G-E1XJME4TKG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth,firebase };
