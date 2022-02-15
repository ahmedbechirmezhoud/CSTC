import LoginPageScreen from '../screens/LoginPageScreen/LoginPageScreen'
import RegisterScreen from '../screens/Register/RegisterScreen';
import FbRegistrationScreen from '../screens/FbRegistrationScreen/FbRegistrationScreen';
import ForgotPwdScreen from '../screens/ForgotPwdScreen/ForgotPwdScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AddEmail from '../screens/Settings/AddEmail/AddEmail';
import ChangeEmail from '../screens/Settings/ChangeEmail/ChangeEmail';
import ChangePwd from '../screens/Settings/ChangePwd/ChangePwd';
import TimelineScreen from '../screens/TimelineScreen/TimelineScreen';
import VoteScreen from '../screens/VoteScreen/VoteScreen';
import RegistrationClosedScreen from '../screens/Register/RegistrationClosedScreen';
import VoteClosedScreen from '../screens/VoteScreen/VoteClosedSreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import ErrorModal from '../screens/ErrorModal';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useContext, useEffect, useState } from 'react';
import { auth, db } from '../configInit';
import { InfoConsumer, InfoContext } from '../Context/InfoContext';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import { onSnapshot, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Navigator() {


  const [user, setUser] = useState(auth.currentUser);
  
  auth.onAuthStateChanged(() => {
     setUser(auth.currentUser);
  });

  return (
    <InfoConsumer>
      {({ info, dispatchInfo }) => {

        setJSExceptionHandler((error, isFatal) => {
          dispatchInfo({payload : {error}});
        }, true);

        return(
        <NavigationContainer>
          <ErrorModal />
          {user ? <RootNavigator /> : <AuthNavigator />}
        </NavigationContainer>);
      }}
    </InfoConsumer>
  );
}


const Stack = createNativeStackNavigator();


function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AddEmail" component={AddEmail} options={{headerTitle : ""}} />
        <Stack.Screen name="ChangePwd" component={ChangePwd} options={{headerTitle : ""}} />
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{headerTitle : ""}} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


function AuthNavigator() {

  const [EnableRegistration, setEnableRegistration] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const { dispatchInfo } = useContext(InfoContext);

  onSnapshot(doc(db, "config", "registrationwindow"), (doc) => {
    const currentDate = new Date();
    setEnableRegistration((new Date(doc.data()["start"].seconds*1000) < currentDate) && (new Date(doc.data()["end"].seconds*1000) > currentDate));
  });

  useEffect(() => {
    AsyncStorage.getItem("firstTime", (error, result) => {
      if(error) dispatchInfo({payload : {error}});
      if(result == null){
          setFirstTime(true)
          AsyncStorage.setItem("firstTime", "false");
      }else setFirstTime(false);
  });
  }, [])

  return (
    <Stack.Navigator>
      {firstTime && <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />}
      <Stack.Screen name="Login" component={LoginPageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={EnableRegistration ? RegisterScreen : RegistrationClosedScreen} options={{ headerShown: false }} />
      {EnableRegistration && <Stack.Screen name="FbRegistrationCompletion" component={FbRegistrationScreen} options={{ headerShown: false }} />}
      <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} options={{ headerShown: false }} />
   </Stack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

  const [EnableVote, setEnableVote] = useState(null);

  onSnapshot(doc(db, "config", "votingwindow"), (doc) => {
    const currentDate = new Date();
    setEnableVote((new Date(doc.data()["start"].seconds*1000) < currentDate) && (new Date(doc.data()["end"].seconds*1000) > currentDate));
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Settings"
      screenOptions={{
        tabBarActiveTintColor: '#2f95dc',
      }}>
      <BottomTab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <TabBarIcon name="timer" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Vote"
        component={EnableVote ? VoteScreen : VoteClosedScreen}
        options={{
          title: 'Vote',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="vote" color={color} size={30} style={{ marginBottom: -3 }} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
