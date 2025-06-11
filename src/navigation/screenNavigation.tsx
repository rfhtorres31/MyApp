import React from 'react';
import { createNativeStackNavigator,   } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/registerScreen/register';
import {LoginScreen} from '../screens/loginScreen/login';
import HomeScreen from '../screens/homeScreen/home';
import  ProfileScreen  from '../screens/profileScreen/profile';
import ComplexTaskScreen from '../screens/taskScreen/addTaskScreen/addTaskScreen';


// Define the param list for navigation
export type RootStackParamList = {
  Home: undefined,
  Register: undefined;
  Login: undefined;
  Profile: {username: string};
  AddTask: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Properly typed stack

const ScreenNavigator = () => {
  return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, animation: 'fade', }}>
          <Stack.Screen name="Home" component={HomeScreen as React.ComponentType<any>} /> 
          <Stack.Screen name="Register" component={RegisterScreen as React.ComponentType<any>} />
          <Stack.Screen name="Login" component={LoginScreen as React.ComponentType<any>} />
          <Stack.Screen name="Profile" component={ProfileScreen as React.ComponentType<any>} />
          <Stack.Screen name="AddTask" component={ComplexTaskScreen as React.ComponentType<any>} />
        </Stack.Navigator>
  );
};


export default ScreenNavigator;
