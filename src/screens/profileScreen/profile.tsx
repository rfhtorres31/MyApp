import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {profileStyles} from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';
import { verifyToken } from '../../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ProfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>; // This tells the app that hey, im in the Home route and i want to know what other routes I can go into
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation:ProfilScreenNavigationProp,
    route:ProfileScreenRouteProp
};

export const ProfileScreen = ({navigation, route}:Props) => {

      const username = route?.params?.username ?? "test";
      const dateNow = new Date();

      useEffect(()=>{
       
           const tokenVerification = async () => {

                const token =  await AsyncStorage.getItem('authToken'); //Always put inside an asynchronous function the AsynStorage Class
                
                // if token is not found, redirect to home page
                if (!token) {
                    console.log("Executed");
                    navigation.navigate('Home');
                    return;  //execution stops here, it will not execute the next lines/process
                }
                
                const isTokenValid = await verifyToken(token);
                
                // if token is invalid, redirect to home page
                if (!isTokenValid) {
                    navigation.navigate('Home');
                }
           }; 

           tokenVerification(); 
      }, []);
    
      const day = getDayName(dateNow.getDay());
      const month = getMonthName(dateNow.getMonth()); // in javascript .getMonth() function is a zero based, meaning, January starts at index = 0
      const date = dateNow.getDate();
      const dateHeader = `${day}, ${month} ${date}`;

    
      return (
         <SafeAreaView style={profileStyles.profileContainer}>
            <View style={profileStyles.headerContainer1}>
               <Text style={profileStyles.dateHeaderTxt}>{dateHeader}</Text>
               <TouchableOpacity style={profileStyles.notifBtn}>
                  <Ionicons name="notifications-outline" size={25} color="#000" />
               </TouchableOpacity>             
            </View>
            <View style={profileStyles.headerContainer2}>
               <Text style={profileStyles.introHeaderTxt}>Hi, {username}</Text>
               <Text style={profileStyles.introHeaderTxt}>Whats on your mind?</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={profileStyles.carouselContainer} contentContainerStyle={{flexDirection:'row', paddingRight: '3%', alignItems: 'center',}}>               
              <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={profileStyles.featureContainer}>

              </LinearGradient>
              <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={profileStyles.featureContainer}>

              </LinearGradient>
              <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={profileStyles.featureContainer}>

              </LinearGradient>
           </ScrollView>
           <View style={profileStyles.mainContainer}>
              <Text>Test4</Text>
           </View>
           <View style={profileStyles.menuContainer}>
              <Text>Test5</Text>
           </View>
        </SafeAreaView>
    );
};
