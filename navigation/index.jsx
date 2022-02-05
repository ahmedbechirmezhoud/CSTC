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
import { auth } from '../configInit';


export default function Navigator() {

  const user = auth.currentUser;

  return (
    <NavigationContainer>
      {user ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Timeline" component={() => <View><Text>Hi</Text></View>} options={{ headerShown: false }} />
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
      
      {/*To be removed along with the import*/}
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddEmail" component={AddEmail} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePwd" component={ChangePwd} options={{ headerShown: false }} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
