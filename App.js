import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './navigation';

import { LogBox } from 'react-native'; 


export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
      <StatusBar />
    </SafeAreaProvider>
  ); 
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

