// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDFmW2UPN4Ml3183LvVCDewPsNCroQvhoQ",
    authDomain: "hostingtest-aadc2.firebaseapp.com",
    projectId: "hostingtest-aadc2",
    storageBucket: "hostingtest-aadc2.appspot.com",
    messagingSenderId: "269529898742",
    appId: "1:269529898742:web:4cdf9af94698c7b6ce56d7",
    measurementId: "G-11F1RQQW08"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, googleProvider, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword};

//export const auth = getAuth(app);