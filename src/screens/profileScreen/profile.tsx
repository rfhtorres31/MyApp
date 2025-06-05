import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {profileStyles, shadowSettings} from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';
import { verifyToken, logoutUser } from '../../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Shadow } from 'react-native-shadow-2';
import AddTaskTypeModal from '../../modals/addTask';
import SearchTaskModal from '../../modals/searchTask';
import {getGenericPassword} from 'react-native-keychain';
import { BACKEND_URL } from '@env';
import { jwtDecode } from 'jwt-decode';

type ProfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>; // This tells the app that hey, im in the Home route and i want to know what other routes I can go into
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation:ProfilScreenNavigationProp,
    route:ProfileScreenRouteProp
};

type payloadFormat = {
   id: string,
   jwtID: string,
   name: string,
   iat: number,
   exp: number,
};

const ProfileScreen = ({navigation, route}:Props) => {
       
      const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
      const [searchTaskModalVisible, setSearchTaskModalVisible] = useState(false);
      const username = route?.params?.username ?? "test";
      const dateNow = new Date();

      useEffect(()=>{
            
           let userID = "";
           const tokenVerification = async () => {

                try {

                    const credentials = await getGenericPassword();

                    if (!credentials) {
                       navigation.navigate('Home'); 
                       return; 
                    }

                    const token = credentials.password;

                    if (!token){
                       navigation.navigate('Home'); 
                       return; 
                    }

                    const isTokenValid = await verifyToken(token);

                    if (!isTokenValid) {
                        navigation.navigate('Home');
                    }

                    const payload = jwtDecode<payloadFormat>(token);

                    userID = payload?.id;
                    
                    // get ongoing tasks
                    const response = await fetch(`${BACKEND_URL}/api/get-task?userID=${userID}`, {
                          method: 'GET', 
                          headers: {
                            'Content-Type': 'application/json',
                          }
                    });

                    const parsedObj = await response.json();
                    console.log(parsedObj);

                }
                catch (err){
                  console.error(err);
                  navigation.navigate('Home');
                }            
            
           }; 

           tokenVerification(); 
      }, []);
    
      const day = getDayName(dateNow.getDay());
      const month = getMonthName(dateNow.getMonth()); // in javascript .getMonth() function is a zero based, meaning, January starts at index = 0
      const date = dateNow.getDate();
      const dateHeader = `${day}, ${month} ${date}`;

      const handleLogout = async () => {
           
           const responseObj = await logoutUser();
           const success = responseObj?.success;
           
           // Either token is invalid (false) or token deletion is success (true), redirect to login screen.
           if (success == false || success == true) {
               navigation.reset({
                     index: 0,
                     routes: [{name: 'Login'}], 
               });
           }
      }; 


      return (
         <SafeAreaView style={profileStyles.profileContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios'? 'padding': 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>           
            <View style={profileStyles.headerContainer1}>
               <TouchableOpacity style={profileStyles.userSettingsBtn} onPress={()=>handleLogout()}>
                  <Ionicons name="log-out-outline" size={23} color="#000" />
               </TouchableOpacity>             
            </View>
            <View style={profileStyles.headerContainer2}>
               <Text style={profileStyles.introHeaderTxt1}>Hello {username}</Text>
               <Text style={profileStyles.dateHeaderTxt}>{dateHeader}</Text>
            </View>  
           <View style={profileStyles.carouselContainer}>
           <Text style={profileStyles.carouselHeader}>Completed Tasks</Text>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={profileStyles.carouselBody} contentContainerStyle={{flexDirection:'row', paddingRight: '3%', paddingTop: '3%', paddingBottom: '3%'}}>               
              <Shadow {...shadowSettings}>
                <LinearGradient colors={['#eafcff', '#b3eaff']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
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
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
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
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
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
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
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
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
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
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="cart-outline" size={24} color="#000"/>
                        <Text style={profileStyles.featureTitle}>Shopping</Text>
                     </View>
                     <Text style={profileStyles.featureDesc}>Groceries, wishlists</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>
           </ScrollView>
           </View>
           <View style={profileStyles.mainContainer}>
             <View style={profileStyles.mainHeaderContainer}>
                <Text style={profileStyles.mainHeaderTxt}>Ongoing Tasks</Text>
                <TouchableOpacity style={profileStyles.searchBar} onPress={()=>setSearchTaskModalVisible(true)}>
                  <TextInput style={profileStyles.searchBarTxt} editable={false} placeholder="Search"/>
                  <Ionicons name="search" size={23} color="#4a4a4a" style={profileStyles.searchBtn}/>
                </TouchableOpacity>
             </View>
           
              
              



              
           </View>
           <View style={profileStyles.TestContainer}>
              
           </View>

           <SearchTaskModal  visible={searchTaskModalVisible} onClose={()=>setSearchTaskModalVisible(false)}/>
                                                        
           <AddTaskTypeModal visible={createTaskModalVisible} onNavigate={()=>navigation.navigate('SimpleTask')} onClose={()=>setCreateTaskModalVisible(false)} />
           
           </View>
           </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default ProfileScreen;