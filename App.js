import { auth } from './configInit'; // Init config

import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as authService from './services/auth/authService';

import { LogBox } from 'react-native'; // Suppress a warning caused by firestore
import { CurrentUser } from './utils/user';

export default function App() {
  const recaptchaVerifier = useRef(null);
  let testemail = 'testemail@qa.team', testpassword='randomPass0';

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
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Signup' onPress={async ()=>{
        await authService.signUpEmail(testemail, testpassword) // Will disconnect user for email verif
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
        await authService.addPhoneToCurrentUser("+216 95262865");
      }} />

      <Text />

      <Button title='Fb Signin' onPress={async ()=>{
        await authService.signinWithFacebook()
      }} />
      <Button title='Change/Add pass' onPress={async ()=>{
        authService.updateUserPassword("randomPass0")
      }} />
      <StatusBar style="auto" />
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
