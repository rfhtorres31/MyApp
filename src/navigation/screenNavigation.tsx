import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/registerScreen/register';
import LoginScreen from '../screens/loginScreen/login';

// Define the param list for navigation
export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Properly typed stack

const ScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Register" component={RegisterScreen as React.ComponentType<any>} />
      <Stack.Screen name="Login" component={LoginScreen as React.ComponentType<any>} />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;
