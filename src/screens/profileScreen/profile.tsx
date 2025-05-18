import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {profileStyles} from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ProfileScreen = ({navigation}:any) => {
    
    const dateNow = new Date();
    const baseURL = 'http://10.0.2.2:3304';
    const [authToken, setAuthToken] = useState('');


    useEffect(()=>{
      console.log("Profile Screen Rendered");
      const getToken = async () => {
         const token =  await AsyncStorage.getItem('authToken'); //Always put inside an asynchronous function the AsynStorage Class
         token ? setAuthToken(token): setAuthToken('');
      };

     getToken();
  
    }, []);
    
    const verifyToken = async (authToken :any) => {
         
      try {
            
          const response = await fetch(`${baseURL}/api/auth/verify-token`, {
                 method: 'GET',
                 headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                 },
            });
          
          const data = await response.json();

          if (!response.ok) {
             throw new Error (JSON.stringify(data));
          }
       
        }
        // If token is invalid, redirect to Home (Auto Logout)
        catch (e) {      
         //  navigation.navigate('Home');
          console.error(e);
        }
    };

    if (authToken) {
        verifyToken(authToken);       
    }
     
    const day = getDayName(dateNow.getDay());
    const month = getMonthName(dateNow.getMonth()); // in javascript .getMonth() function is a zero based, meaning, January starts at index = 0
    const date = dateNow.getDate();
    const dateHeader = `${day}, ${month} ${date}`;

    
    return (
        <SafeAreaView style={profileStyles.profileContainer}>
           <View style={profileStyles.headerContainer1}>
              <Text style={profileStyles.dateHeaderTxt}>{dateHeader}</Text>
           </View>
           <View style={profileStyles.headerContainer2}>
              <Text style={profileStyles.introHeaderTxt}>Hi, "Username"</Text>
              <Text style={profileStyles.introHeaderTxt}>Whats on your mind?</Text>
           </View>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={profileStyles.carouselContainer} contentContainerStyle={{flexDirection:'row', paddingRight: 5, alignItems: 'center',}}>               
               <LinearGradient colors={['#393e46', '#222831', '#111']} style={profileStyles.featureContainer}>

               </LinearGradient>
               <LinearGradient colors={['#393e46', '#222831', '#111']} style={profileStyles.featureContainer}>

               </LinearGradient>
               <LinearGradient colors={['#393e46', '#222831', '#111']} style={profileStyles.featureContainer}>

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
