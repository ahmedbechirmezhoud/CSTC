import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FirebaseCore from 'expo-firebase-core';
import { getApp, initializeApp } from 'firebase/app';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import LoginPageScreen from './screens/LoginPage/LoginPageScreen';


export default function App() {

  useEffect(() => {
    if (FirebaseCore.DEFAULT_APP_OPTIONS)
      initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);
  }, [])


  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A2980', '#1CB5E0']} style={styles.background}>

        <LoginPageScreen/>

      </LinearGradient>
      <StatusBar style="auto" />
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