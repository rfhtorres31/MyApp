import React, {useEffect, useRef} from 'react';
import { Text, Animated, View, Dimensions } from "react-native";
import homeStyle from "./homeScreen.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import ClockIcon from '../../../assets/images/clock-3.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/screenNavigation';

const {width, height} = Dimensions.get('window');

const logoWidth = width * 0.55;
const logoHeight = height * 0.55;


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>; // This tells the app that hey, im in the Home route and i want to know what other routes I can go into
type Props = {navigation:HomeScreenNavigationProp};

const HomeScreen = ({navigation}:Props) => {
      
     const opacAnim = useRef(new Animated.Value(0)).current; // Starting value is 0

       useEffect(() => {        
                  Animated.timing(opacAnim, {
                     toValue: 1, 
                     duration: 3500,
                     useNativeDriver: true,
                  }).start(()=>{
                        navigation.replace('Register'); //This replaces the Home screen with Register Screen in the stack, the user can go back now to the Home screen after navigating to the Register Screen
                  });
        }, []);

     return (
        <SafeAreaView style={{flex:1}}>
           <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={homeStyle.homeContainer}>
              <Animated.View style={[homeStyle.logoContainer, {opacity:opacAnim}]}>
                <ClockIcon  width={logoWidth} height={logoHeight}/> 
                <View style={{flexDirection: 'row'}}>
                  <Text style={homeStyle.logoTxt1}>Remind</Text>
                  <Text style={homeStyle.logoTxt2}>Me</Text>
                </View>
              </Animated.View> 
           </LinearGradient>
        </SafeAreaView>
    );
};



export default HomeScreen;