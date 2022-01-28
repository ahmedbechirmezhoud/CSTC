import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPageScreen from '../screens/LoginPageScreen/LoginPageScreen'
import RegisterScreen from '../screens/Register/RegisterScreen';
import { View, Text } from 'react-native';
import { auth } from '../configInit';

export default function Navigator() {

    const user = auth.currentUser;
    
    return (
      <NavigationContainer> 
          {  user ? <RootNavigator /> : <AuthNavigator /> }
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
        </Stack.Navigator>
      );
}
