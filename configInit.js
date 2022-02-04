import { getApps, initializeApp, FirebaseApp } from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import * as Facebook from 'expo-facebook';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


if(getApps().length === 0){
  initializeApp({
    "apiKey": "AIzaSyBQH0riI5e09XX-pEcjvhCMAQEz2gvhDMY",
    "authDomain": "cstc-2a071.firebaseapp.com",
    "projectId": "cstc-2a071",
    "storageBucket": "cstc-2a071.appspot.com",
    "messagingSenderId": "669579499696",
    "appId": "1:669579499696:web:dab2291f0cc2886d0b8375",
    "measurementId": "G-LYQL9V1W9K",
    "databaseURL": "https://cstc-2a071-default-rtdb.europe-west1.firebasedatabase.app"

  });
  Facebook.initializeAsync({
    appId: '635693490984759',
  });
}

const auth = getAuth();
const firestore = getFirestore();
const db = getFirestore();
const rtdb = getDatabase();

export { auth, firestore, db, rtdb };