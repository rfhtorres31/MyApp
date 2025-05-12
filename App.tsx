import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './src/navigation/screenNavigation';



const App = () => {
    
  return (
       <NavigationContainer>
          <ScreenNavigator/>
       </NavigationContainer>
  );

};


export default App;

