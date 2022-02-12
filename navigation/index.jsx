import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPageScreen from '../screens/LoginPageScreen/LoginPageScreen'
import RegisterScreen from '../screens/Register/RegisterScreen';
import FbRegistrationScreen from '../screens/FbRegistrationScreen/FbRegistrationScreen';
import ForgotPwdScreen from '../screens/ForgotPwdScreen/ForgotPwdScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AddEmail from '../screens/Settings/AddEmail/AddEmail';
import ChangeEmail from '../screens/Settings/ChangeEmail/ChangeEmail';
import ChangePwd from '../screens/Settings/ChangePwd/ChangePwd';

import { View, Text } from 'react-native';
import { useState } from 'react';
import { auth } from '../configInit';
import { InfoConsumer } from '../Context/InfoContext';
import ErrorModal from '../screens/ErrorModal';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import TimelineScreen from '../screens/TimelineScreen/TimelineScreen';
import VoteScreen from '../screens/VoteScreen/VoteScreen';



export default function Navigator() {


  const [user, setUser] = useState(auth.currentUser);

  auth.onAuthStateChanged(() => {
     setUser(auth.currentUser);
  });

  return (
    <InfoConsumer>
      {({ info, dispatchInfo }) => {
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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FbRegistrationCompletion" component={FbRegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} options={{ headerShown: false }} />
   </Stack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

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
        component={VoteScreen}
        options={{
          title: 'Vote',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="vote" color={color} size={30} style={{ marginBottom: -3 }} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />
        })}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
