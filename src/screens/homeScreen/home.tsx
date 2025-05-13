import React, {useEffect, useRef} from 'react';
import { Text, TouchableOpacity, Animated, View, Dimensions } from "react-native";
import homeStyle from "./homeScreen.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import ClockIcon from '../../../assets/images/clock-2.svg';

const AnimatedClock = Animated.createAnimatedComponent(ClockIcon);
const {width, height} = Dimensions.get('window');

const logoWidth = width * 0.6;
const logoHeight = height * 0.6;

const HomeScreen = () => {
      
     const scaleAnim = useRef(new Animated.Value(1)).current;

       useEffect(() => {
        // Animate the image to shrink
       Animated.timing(scaleAnim, {
               toValue: 0.7, // Shrink to 50%
               duration: 2500,
               useNativeDriver: true,
      }).start();
      }, []);

     return (
        <SafeAreaView style={{flex:1}}>
           <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={homeStyle.logoContainer}>
                   <AnimatedClock  width={logoWidth} height={logoHeight} style={{ transform: [{ scale: scaleAnim }] }}/> 
              </View>              
           </LinearGradient>
        </SafeAreaView>
    );
};



export default HomeScreen;