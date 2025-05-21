import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './src/navigation/screenNavigation';


const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {
    
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState(undefined);

  useEffect(()=>{
     
    const restoreState = async () => {
         
      try {          
        const currentState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state  = currentState ? JSON.parse(currentState) : undefined;
         
        if (state !== undefined) {
            setInitialState(state);
        }
      }
      catch (e){
      }
      finally {
         setIsReady(true);
      }
    };


   restoreState();
  }, []);
   
  if (!isReady) {
    return null;
  }

  return (
       <NavigationContainer initialState={initialState} onStateChange={(state)=>AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
          <ScreenNavigator/>
       </NavigationContainer>
  );

};


export default App;

