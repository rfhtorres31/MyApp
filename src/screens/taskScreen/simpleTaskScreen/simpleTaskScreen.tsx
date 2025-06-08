import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/screenNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import {simpleTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings, labelStylesSettings, inputStylesSettings} from './simpleTaskScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFPercentage } from "react-native-responsive-fontsize";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import {BACKEND_URL, BACKEND_URL_2} from '@env'
import {getGenericPassword } from 'react-native-keychain';
import { verifyToken } from '../../../utils/authUtils';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

type SimpleTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SimpleTask'>;
type Props = {
    navigation:SimpleTaskScreenNavigationProp,
};


const SimpleTaskScreen = ({navigation}:Props) => {
      
     const [startDate, setStartDate] = useState<Date | null>(null);
     const [endDate, setEndDate] = useState<Date | null>(null);
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // this means that this can hold either string or null value
     const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
     const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

     const [taskData, setTaskData] = useState({
         title: '',
         description: '',
         category: '',
         fromDate: '',
         toDate: '',
     }); 
   

     const categories = ['Personal', 'Work', 'Home', 'Health', 'Bills', 'Shopping'];
     
     const currentDateTime = new Date(); // get the current datetime
     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get the current timezone of the user's device
     const currentTime = currentDateTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}); // get the current time
     
     // function for handling selection of category
     const handleCategory = (category: string) => {
        
        if (selectedCategory === category) {
           setSelectedCategory(null);
           setTaskData(prev=>({
              ...prev, 
              category: '',
           }));   
        } else {
            setSelectedCategory(prev=>(prev === category ? null : category));
            setTaskData(prev=>({
              ...prev, 
              category: category,
            }));  
        }     
     };


     
     const showStartDatePicker = () => setStartDatePickerVisibility(true);
     const hideStartDatePicker = () => setStartDatePickerVisibility(false);

     const showEndDatePicker = () => setEndDatePickerVisibility(true);
     const hideEndDatePicker = () => setEndDatePickerVisibility(false);

     const handleStartDateConfirm = (selectedDate: Date) => {
          setStartDate(selectedDate); 
          setTaskData(prev=>({
          ...prev, 
          fromDate: selectedDate.toLocaleString('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}),
          }));  
          hideStartDatePicker();
     };

    const handleEndDateConfirm = (selectedDate: Date) => {
          setEndDate(selectedDate);
          setTaskData(prev=>({
          ...prev, 
           toDate: selectedDate.toLocaleString('en-US',
            { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}),
          }));  

          hideEndDatePicker();
     };

    const handleChange = (field:string, value:string) => {

        setTaskData(
            taskData => (
                {...taskData, [field]:value}
            )
        );
    };
    
    const handleBack = ()=> {
          navigation.reset({
                  index: 0,
                  routes: [{name: 'Profile'}], 
          });
    };

    const handleSubmit = async () => {
    
       try {
         
         const isTaskDataEmpty = Object.values(taskData).some(value=>value === '');
         console.log(isTaskDataEmpty);

         if (isTaskDataEmpty) {
            Alert.alert('Missing Information', 'Fill in all the required fields');
            return;
         }

         const credentials = await getGenericPassword();
         
         if (!credentials) {
            throw new Error("No credentials found for token");
         }

         const authToken = credentials.password;
         const isTokenValid = await verifyToken(authToken);

         if (!isTokenValid) {
            navigation.navigate('Home');
            return; // Stop further execution
         }

         const response = await fetch(`${BACKEND_URL}/api/add-task`, {
                     method : 'POST',
                     headers: {
                         'Authorization': `Bearer ${authToken}`, 
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(taskData)
         });
        
       const parsedResponse = await response.json();

       if (!response.ok) {
          Alert.alert('Server Unavailable', 'Please try again later');
          const responsObj = await response.json();
          console.log(responsObj);
          return; 
       }
       
       Toast.show({
         type: 'success',
         text1: 'Task created!',
         text2: 'Your task was added successfully.',
         visibilityTime: 3000, 
         onHide: () =>  {
            setTimeout(()=>{
              navigation.reset({
                  index: 0,
                  routes: [{name: 'Profile'}], 
             })
            }, 1000);
         }
         });
         


       }
       catch (err) {
         console.error(err);
       }
    };

     
     return (
         <SafeAreaView style={simpleTaskScreenStyles.taskContainer}>
            <View style={simpleTaskScreenStyles.headerContainer}>
                <TouchableOpacity style={simpleTaskScreenStyles.backBtn} onPress={handleBack}>
                    <Ionicons name="arrow-back-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={simpleTaskScreenStyles.headerTxt}>Add Task</Text>            
            </View>
            <View style={simpleTaskScreenStyles.bodyContainer}>
                <View style={simpleTaskScreenStyles.inputField}>
                  <FloatingLabelInput label="Title" value={taskData.title} onChangeText={value=>handleChange('title', value)} containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.descriptionField}>
                  <FloatingLabelInput  label="Description" value={taskData.description} onChangeText={value=>handleChange('description', value)} multiline containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.categoryFieldContainer}>
                  <Text style={simpleTaskScreenStyles.categoryHeader}>Category</Text>
                  <View style={simpleTaskScreenStyles.categoryBody}>
                     {
                      categories.map(category => (
                         <TouchableOpacity key={category} style={[simpleTaskScreenStyles.categoryBox, selectedCategory === category && simpleTaskScreenStyles.categoryBoxBtn]} onPress={() => handleCategory(category)}>
                              <Text style={simpleTaskScreenStyles.categoryBoxTxt}>{category}</Text>
                         </TouchableOpacity>
                      ))
                     }
                     
                  </View>
                </View>
                <View style={simpleTaskScreenStyles.dateFieldContainer}>
                  <View style={simpleTaskScreenStyles.startDate}>
                     <Text style={simpleTaskScreenStyles.dateTimeHeader}>From</Text>
                     <TouchableOpacity style={simpleTaskScreenStyles.dateTimeContent} onPress={showStartDatePicker}>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{startDate? startDate.toLocaleString().split(",").join("\n") : 'Select Start Date'}</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={simpleTaskScreenStyles.endDate}> 
                     <Text style={simpleTaskScreenStyles.dateTimeHeader}>To</Text>
                     <TouchableOpacity style={simpleTaskScreenStyles.dateTimeContent} onPress={showEndDatePicker}>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{endDate? endDate.toLocaleString().split(",").join("\n") : 'Select End Date'}</Text>
                     </TouchableOpacity>
                  </View>
                  <DateTimePickerModal 
                       isVisible={isStartDatePickerVisible} 
                       mode="datetime"
                       onConfirm={handleStartDateConfirm}
                       onCancel={hideStartDatePicker} />
                  <DateTimePickerModal 
                       isVisible={isEndDatePickerVisible} 
                       mode="datetime"
                       onConfirm={handleEndDateConfirm}
                       onCancel={hideEndDatePicker} />
                </View>
                <LinearGradient colors={['#4ef2ef', '#2ec7e6']} style={simpleTaskScreenStyles.submitBtnContainer}>
                  <TouchableOpacity style={simpleTaskScreenStyles.submitBtn} onPress={handleSubmit}>
                    <Text style={[{textAlign: 'center', color: 'white', fontSize: RFPercentage(2.6), fontFamily: 'Raleway-Medium'}]}>Create Task</Text>
                  </TouchableOpacity>
                </LinearGradient>
            </View>
         </SafeAreaView>
     );

      


};


export default SimpleTaskScreen;