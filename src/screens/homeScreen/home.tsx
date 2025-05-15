import React, {useEffect, useRef} from 'react';
import { Text, TouchableOpacity, Animated, View, Dimensions } from "react-native";
import homeStyle from "./homeScreen.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import ClockIcon from '../../../assets/images/clock-3.svg';

const AnimatedClock = Animated.createAnimatedComponent(ClockIcon);
const {width, height} = Dimensions.get('window');

const logoWidth = width * 0.6;
const logoHeight = height * 0.6;

const logoStartPosition = height * 0.5;


const HomeScreen = () => {
      
     const opacAnim = useRef(new Animated.Value(0)).current; // Starting value is 0
     const moveUpAnim = useRef(new Animated.Value(logoStartPosition)).current; 

       useEffect(() => {        
                  Animated.timing(moveUpAnim, {
                     toValue: 0, // to original position
                     duration: 2000,
                     useNativeDriver: true,
                  }).start();
        }, []);

     return (
        <SafeAreaView style={{flex:1}}>
           <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={{flex:1,}}>
              <Animated.View style={[homeStyle.logoContainer, {transform: [{translateY: moveUpAnim}]}]}>
                   <AnimatedClock  width={logoWidth} height={logoHeight}/> 
                   <Text style={homeStyle.logoTxt}>RemindMe</Text>
              </Animated.View>          
           </LinearGradient>
        </SafeAreaView>
    );
};



export default HomeScreen;