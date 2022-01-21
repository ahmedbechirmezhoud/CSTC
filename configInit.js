
import { getApps, initializeApp, FirebaseApp } from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import * as Facebook from 'expo-facebook';
import { getAuth } from 'firebase/auth';

if(getApps().length === 0){
  if(FirebaseCore.DEFAULT_APP_OPTIONS){
    initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);
  }
}

Facebook.initializeAsync({
  appId: '635693490984759',
});

const auth = getAuth();
export {auth};