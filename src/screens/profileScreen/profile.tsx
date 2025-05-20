import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {profileStyles} from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';
import { verifyToken } from '../../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ProfileScreen = ({navigation}:any) => {
    
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
