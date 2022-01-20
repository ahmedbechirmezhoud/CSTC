import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FirebaseCore from 'expo-firebase-core';
import { getApp, initializeApp } from 'firebase/app';

export default function App() {

  useEffect(() => {
    if(FirebaseCore.DEFAULT_APP_OPTIONS)
    initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);
  }, [])


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
