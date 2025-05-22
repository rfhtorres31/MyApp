import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {profileStyles, shadowSettings} from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';
import { verifyToken } from '../../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTaskTypeModal from '../../modals/addtaskmodal';
import { Shadow } from 'react-native-shadow-2';

type ProfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>; // This tells the app that hey, im in the Home route and i want to know what other routes I can go into
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation:ProfilScreenNavigationProp,
    route:ProfileScreenRouteProp
};


const ProfileScreen = ({navigation, route}:Props) => {
       
      const [modalVisible, setModalVisible] = useState(false);
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
               <TouchableOpacity style={profileStyles.userSettingsBtn}>
                  <Ionicons name="person-outline" size={23} color="#000" />
               </TouchableOpacity>             
            </View>
            <View style={profileStyles.headerContainer2}>
               <Text style={profileStyles.introHeaderTxt1}>Hello {username}</Text>
               <Text style={profileStyles.dateHeaderTxt}>{dateHeader}</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={profileStyles.carouselContainer} contentContainerStyle={{flexDirection:'row', paddingRight: '3%', alignItems: 'center',}}>               
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="person-circle-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Personal</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Personal goals, self care, habits</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="briefcase-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Work</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Office Tasks, meetings, deadlines</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="home-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Home</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>House Chores, maintenance</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="medkit-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Health</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Doctor visits, meds, workouts</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="card-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Bills</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Bill payments, rent, subscriptions</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="cart-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Shopping</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Groceries, wishlists</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
           </ScrollView>
           <View style={profileStyles.mainContainer}>

              <AddTaskTypeModal visible={modalVisible} onClose={()=>setModalVisible(false)}/>



              <Text>Test4</Text>
           </View>
           <View style={profileStyles.menuContainer}>
              <TouchableOpacity style={profileStyles.addIconBtn} onPress={()=>setModalVisible(true)}>
                  <Ionicons name="add" size={28} color="#000" />
              </TouchableOpacity>
           </View>
        </SafeAreaView>
    );
};


export default ProfileScreen;