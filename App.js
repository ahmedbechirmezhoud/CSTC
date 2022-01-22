import { auth } from './configInit'; // Init config

import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

import * as authService from './services/auth/authService';
import * as userData from './services/firestore/userFuncs';

import { LogBox } from 'react-native'; // Suppress a warning caused by firestore


export default function App() {
  const recaptchaVerifier = useRef(null);

  useEffect(()=>{
    auth.onAuthStateChanged(async (user)=> {
      console.log('Auth Changed!');
      console.log(user ? 'Logged in' : 'Not logged in')
      if(user){
        console.log(await userData.getCurrentUserData());
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        attemptInvisibleVerification={true}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Signin' onPress={()=>{authService.signinWithEmail('testemail@qa.team', 'randomPass0')}} />
      <Button title='Signup' onPress={()=>{authService.signUpEmail('testemail@qa.team', 'randomPass0')}} />
      <Button title='PhoneLink' onPress={async ()=>{
        let verificationId = await authService.sendVerificationCode("+216 95262865", recaptchaVerifier.current)
        authService.addPhoneToCurrentUser(verificationId, "000000");
      }} />
      <Button title='PhoneSignin' onPress={async ()=>{
        let verificationId = await authService.sendVerificationCode("+216 95262865", recaptchaVerifier.current)
        authService.signInWithPhone(verificationId, "000000");
      }} />
      <Button title='Signout' onPress={authService.signOut} />

      <Button title='Fb Signin' onPress={authService.signinWithFacebook} />
      <StatusBar style="auto" />
      
      <FirebaseRecaptchaBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
