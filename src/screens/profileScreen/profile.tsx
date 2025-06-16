import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
import SearchTaskModal from '../../modals/searchTask/searchTask';
import ViewTaskModal from '../../modals/viewTask/viewTask';
import Loader from '../../utils/loader/loader';
import {getGenericPassword} from 'react-native-keychain';
import { BACKEND_URL, BACKEND_URL_2 } from '@env';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
   id: string,
   title: string,
   description: string,
   due_date: string,
   category: string,
   isCompleted: boolean,
};

const ProfileScreen = ({navigation, route}:Props) => {
       
      const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
      const [searchTaskModalVisible, setSearchTaskModalVisible] = useState(false);
      const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
      const [loaderVisible, setLoaderVisible] = useState(false);
      const [onGoingTask, setOnGoingTask] = useState<taskObjFormat[]>([]);
      const [completedTask, setCompletedTask] = useState<taskObjFormat[]>([]);
      const [reloadScreen, setReloadScreen] = useState(false);

      const username = route?.params?.username ?? "test";
      const dateNow = new Date();

      useEffect(()=>{
           const init = async () => {

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
                        return;
                    }
                    
                    // Check if there is cached, if there is, load the displayed tasks from the cached data
                    // If there is no cached, fetch the tasks to the backend server
                    const cached = await AsyncStorage.getItem("userTasks");

                    if (cached) {
                       await loadFromCachedData();
                    }
                    else {
                      await fetchTask();
                    }

                }
                catch (err) {
                  console.error(err);
                  navigation.navigate('Home');
                }          
           }; 

           init(); 
      }, []);
    
      const day = getDayName(dateNow.getDay());
      const month = getMonthName(dateNow.getMonth()); // in javascript .getMonth() function is a zero based, meaning, January starts at index = 0
      const date = dateNow.getDate();
      const dateHeader = `${day}, ${month} ${date}`;


      const fetchTask = async () => {

         try {

            setLoaderVisible(true);
            const credentials = await getGenericPassword();

            if (!credentials) {
                navigation.navigate('Home'); 
                return; 
            }

            const token = credentials.password;
            const payload = jwtDecode<payloadFormat>(token);
            
            let userID = payload?.id; 
                    
            const response = await fetch(`${BACKEND_URL}/api/get-task?userID=${userID}`, {
                  method: 'GET', 
                  headers: {'Content-Type': 'application/json',}
            });

            const parsedObj = await response.json();
            console.log("parsedObj", parsedObj);
            
            if (parsedObj) {

                const taskObj: taskObjFormat[] = parsedObj?.content?.tasks;
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
                                due_date: formatDate(task.due_date)
                        }
                });
               
               const cachedData = {
                     tasks: {
                        onGoingTask: formattedOnGoingTask,
                        completedTask: completedTask,
                     }
               };

               await AsyncStorage.setItem('userTasks', JSON.stringify(cachedData));  
            }
         }
         catch (err) {
           console.error(err);
         }
         finally {
            setLoaderVisible(false); 
         }
      };
      
      const loadFromCachedData = async () => {

         try {
             const tasks = await AsyncStorage.getItem('userTasks');

             if (tasks) {
                const parsedTasks = JSON.parse(tasks);
                const completedTask = parsedTasks?.tasks?.completedTask ?? [];
                const  formattedOnGoingTask = parsedTasks?.tasks?.onGoingTask ?? [];
                console.log(completedTask);
                console.log(formattedOnGoingTask);
                setCompletedTask(completedTask);
                setOnGoingTask(formattedOnGoingTask);  
             }      

         }
         catch (err) {
           console.error(err);
         }
             
      };

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

      const handleTaskDelete = async (taskID: string) => {

            try { 
                  // Display loader
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
                        return;
                  }

                  const payload = jwtDecode<payloadFormat>(token);

                  const userID = payload?.id;

                  const responseObj = await fetch(`${BACKEND_URL}/api/delete-task?taskID=${taskID}&userID=${userID}`, {
                          method: 'DELETE', 
                          headers: {
                            'Content-Type': 'application/json',
                          }
                  }); 

                  const parsedResponse = await responseObj.json();

                  if (parsedResponse && responseObj.ok) {
                      // Update the onGoingTask array state
                      setOnGoingTask(prev=>prev.filter(task=>task.id !== taskID)); 
                  }        
            }
            catch (err) {
                  console.error(err);
            }
            finally {
                 setLoaderVisible(false);
            }
      };

      const handleSubTaskDelete = async (taskID: string) => {
             console.log(taskID);
             setViewTaskModalVisible(true)
      };


      const onRefresh = async () => {
          setReloadScreen(true);
          await fetchTask();
          await loadFromCachedData();
          setReloadScreen(false);       
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
             {
                completedTask.map(task=>(
                 <Shadow {...shadowSettings}>
                     <LinearGradient colors={['#455a64', '#455a64']} style={profileStyles.featureContainer}>
                       <TouchableOpacity style={profileStyles.featureBtn} onPress={()=>setCreateTaskModalVisible(true)}>
                          <View style={profileStyles.featureHeader}>
                            <Ionicons name="person-circle-outline" size={24} color="#fff"/>
                            <Text style={profileStyles.featureTitle}>{task.category}</Text>
                          </View>
                         <Text style={profileStyles.featureDesc}>{task.title}</Text>
                       </TouchableOpacity>
                     </LinearGradient>
                </Shadow>
                ))
             }
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
              <ScrollView refreshControl={<RefreshControl refreshing={reloadScreen} onRefresh={onRefresh}/>} horizontal={false} showsVerticalScrollIndicator={true} style={profileStyles.taskContainer} contentContainerStyle={[{alignItems: 'center', paddingBottom: '5%'}]}>
               {
                  onGoingTask.map(task => (
                      <LinearGradient colors={['#455a64', '#455a64']} style={profileStyles.task}>
                        <TouchableOpacity style={[{flex: 1}]} onPress={()=>handleSubTaskDelete(task.id)}>
                           <Text style={profileStyles.title}>{task.title}</Text>
                           <Text style={profileStyles.category}>{task.category}</Text>
                           <Text style={profileStyles.dueDate}>Due on: {task.due_date}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleTaskDelete(task.id)}>
                           <Ionicons name="trash" size={30} color="#f0c96d" />
                        </TouchableOpacity>
                      </LinearGradient>
                  ))
               }
              </ScrollView>
           </View>
           <View style={profileStyles.TestContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('AddTask')}>
               <Ionicons name="add-circle-outline" size={50} color="#455a64"/>
             </TouchableOpacity>           
           </View>
           <ViewTaskModal visible={viewTaskModalVisible} onClose={()=>setViewTaskModalVisible(false)}/>
           <SearchTaskModal  visible={searchTaskModalVisible} onClose={()=>setSearchTaskModalVisible(false)}/>                                                      
           <Loader visible={loaderVisible} />
           </View>
           </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default ProfileScreen;