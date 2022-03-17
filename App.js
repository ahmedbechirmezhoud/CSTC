import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from   './navigation';
import { registerForPushNotificationsAsync } from "./services/Notification";
import { useEffect, useState, useRef, useContext } from 'react';
import { LogBox } from 'react-native'; 

import { InfoProvider } from './Context/InfoContext';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {

  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {});

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
    

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  return (
    <InfoProvider>
      <SafeAreaProvider>
          <Navigator />        
        <StatusBar />
      </SafeAreaProvider>
    </InfoProvider>
  ); 
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

