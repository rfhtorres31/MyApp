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
import SearchTaskModal from '../../modals/searchTask';
import Loader from '../../utils/loader/loader';
import {getGenericPassword} from 'react-native-keychain';
import { BACKEND_URL, BACKEND_URL_2 } from '@env';
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

type taskObjFormat = {
   title: string,
   description: string,
   from_date: string,
   due_date: string,
   category: string,
   isCompleted: boolean,
};

const ProfileScreen = ({navigation, route}:Props) => {
       
      const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
      const [searchTaskModalVisible, setSearchTaskModalVisible] = useState(false);
      const [loaderVisible, setLoaderVisible] = useState(false);
      const [onGoingTask, setOnGoingTask] = useState<taskObjFormat[]>([]);
      const [completedTask, setCompletedTask] = useState<taskObjFormat[]>([]);
      const username = route?.params?.username ?? "test";
      const dateNow = new Date();

      useEffect(()=>{
            
           let userID = "";
           const tokenVerification = async () => {

                try {

                    // display the loader
                    setLoaderVisible(true);

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

                    // hide the loader 
                    if (parsedObj) {
                       const taskObj: taskObjFormat[] = parsedObj?.content;
                       console.log(taskObj);
                       const onGoingTask: taskObjFormat[] = taskObj.filter(task => task.isCompleted === false);
                       const completedTask: taskObjFormat[] = taskObj.filter(task => task.isCompleted === true);   
                       const formattedOnGoingTask = onGoingTask.map(task => {
                             const formatDate = (dateStr: string) => {
                                    const date = new Date(dateStr);
                                    const day = String(date.getUTCDate()).padStart(2, '0');
                                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                                    return `${day}/${month}`;
                             }; 

                             return {
                                ... task,
                                from_date: formatDate(task.from_date),
                                due_date: formatDate(task.due_date)
                             }
                       });

                       setCompletedTask(completedTask);
                       setOnGoingTask(formattedOnGoingTask);
                       setLoaderVisible(false); // Hide the loader
                    }
                }
                catch (err) {
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
                  <Ionicons name="log-out-outline" size={30} color="#fff" />
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
                <LinearGradient colors={['#455a64', '#455a64']} style={profileStyles.featureContainer}>
                  <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
                     <View style={profileStyles.featureHeader}>
                        <Ionicons name="person-circle-outline" size={24} color="#fff"/>
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
                    <Ionicons name="search" size={23} color="#fff" style={profileStyles.searchBtn}/>
                 </TouchableOpacity>
              </View>
              <ScrollView horizontal={false} showsVerticalScrollIndicator={true} style={profileStyles.taskContainer} contentContainerStyle={[{alignItems: 'center', paddingBottom: '5%'}]}>
               {
                  onGoingTask.map(task => (
                      <LinearGradient colors={['#455a64', '#455a64']} style={profileStyles.task}>
                        <TouchableOpacity style={[{flex: 1}]}>
                           <Text style={profileStyles.title}>{task.title}</Text>
                           <Text style={profileStyles.category}>{task.category}</Text>
                           <Text style={profileStyles.dueDate}>Due on: {task.due_date}</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                  ))

               }
              </ScrollView>
           </View>
           <View style={profileStyles.TestContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('AddTask')}>
               <Ionicons name="add-circle-outline" size={45} color="#fff"/>
             </TouchableOpacity>           
           </View>
           <SearchTaskModal  visible={searchTaskModalVisible} onClose={()=>setSearchTaskModalVisible(false)}/>                                                      
           {/* <AddTaskTypeModal visible={createTaskModalVisible} onNavigateSimple={()=>navigation.navigate('SimpleTask')} onNavigateComplex={()=>navigation.navigate('ComplexTask')} onClose={()=>setCreateTaskModalVisible(false)} /> */}
           <Loader visible={loaderVisible} />
           </View>
           </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default ProfileScreen;