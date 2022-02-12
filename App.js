import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from   './navigation';
import { registerForPushNotificationsAsync } from "./services/Notification";
import { useEffect, useState, useRef, useContext } from 'react';
import { LogBox } from 'react-native'; 

import ErrorModal from './screens/ErrorModal';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import { InfoProvider } from './Context/InfoContext';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  setJSExceptionHandler((error, isFatal) => {
    setError(error);
  });


  return (
    <InfoProvider>
      <SafeAreaProvider>
          
          { /*info?.error && <ErrorModal error={info?.error} setModalVisible={setError} /> */ }
          <Navigator />
          
        <StatusBar />
      </SafeAreaProvider>
    </InfoProvider>
  ); 
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

