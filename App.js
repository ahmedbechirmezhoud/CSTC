import * as FirebaseCore from 'expo-firebase-core';
import { getApp, initializeApp } from 'firebase/app';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import LoginPageScreen from './screens/LoginPage/LoginPageScreen';


import { auth } from './configInit'; // Init config
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

import * as authService from './services/auth/authService';

import { LogBox } from 'react-native'; // Suppress a warning caused by firestore
import { fetchSignInMethodsForEmail } from '@firebase/auth';


export default function App() {
  const recaptchaVerifier = useRef(null);


  useEffect(()=>{
    auth.onAuthStateChanged(async (user)=> {
      console.log('Auth Changed!');
      if(user){
        console.log('Logged in')
      }
      else console.log('Not logged in')
    })
  }, []);

  return (
    <View style={styles.container}>

      <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>

        <LoginPageScreen/>

      </LinearGradient>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        attemptInvisibleVerification={true}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Signup' onPress={()=>{
        authService.signUpEmail(testemail, testpassword) // Will disconnect user for email verif
      }} />
      <Button title='Signout' onPress={async ()=>{
        await authService.signOut()
      }} />

      <Text />

      <Button title='Loginuser phone' onPress={async ()=>{
        await authService.loginUser('+216 95262 865 ', testpassword)

      }} />
      <Button title='Loginuser email' onPress={async ()=>{
        await authService.loginUser(testemail, testpassword)

      }} />

      <Text />

      <Button title='Add pass to fb' onPress={async ()=>{
        await authService.updateUserPassword(testpassword)

      }} />
      <Button title='Link phone' onPress={async ()=>{
        let verificationId = await authService.sendVerificationCode("+216 95262865", recaptchaVerifier.current)
        await authService.addPhoneToCurrentUser(verificationId, "000000");
      }} />

      <Text />

      <Button title='Fb Signin' onPress={async ()=>{
        await authService.signinWithFacebook()
      }} />
      <Button title='Change/Add pass' onPress={async ()=>{
        authService.updateUserPassword("randomPass0")
      }} />

      <StatusBar style="auto" />
      
      <FirebaseRecaptchaBanner />
    </View>

  );
}
const styles = StyleSheet.create({

    container: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
  });
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

