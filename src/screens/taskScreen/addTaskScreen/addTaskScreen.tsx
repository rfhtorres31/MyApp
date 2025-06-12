import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/screenNavigation';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {complexTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings2, customLabelStylesSettings1, labelStylesSettings, inputStylesSettings} from './addTaskScreen.styles';
import AddSubTaskModal from '../../../modals/subTask/subTask';
import { subTaskModalStyle } from '../../../modals/subTask/subTask.styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { verifyToken } from '../../../utils/authUtils';
import { Alert } from 'react-native';
import {BACKEND_URL, BACKEND_URL_2} from '@env';
import {getGenericPassword } from 'react-native-keychain';

type AddTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTask'>;
type Props = {
    navigation:AddTaskScreenNavigationProp,
};

type TaskData = {
   title: string,
   description: string,
   category: string,
   subTask: string[],
   toDate: string,
};

const AddTaskScreen = ({navigation}:Props) => {

    const [taskData, setTaskData] = useState<TaskData>({
           title: '',
           description: '',
           category: '',
           subTask: [],
           toDate: '',
    }); 

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const categories = ['Personal', 'Work', 'Home', 'Health', 'Bills', 'Shopping'];
    const showStartDatePicker = () => setStartDatePickerVisibility(true);
    const hideStartDatePicker = () => setStartDatePickerVisibility(false);
    const [addSubTaskModalVisible, setAddSubTaskModalVisible] = useState(false);
    const [boxes, setBoxes] = useState<number[]>([]);
    const [isDescFocused, setIsDescFocused] = useState(false);
    const [subTaskDetails, setSubTaskDetails] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // this means that this can hold either string or null value
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get the current timezone of the user's device

    const onSubmit = (details: string) => {
         setBoxes(prev=>[...prev, prev.length + 1]);
         setAddSubTaskModalVisible(false);
           setTaskData(prev => ({
            ...prev,
           subTask: [...prev.subTask, details]
         }));
    }; 

    const deleteBox = (index: number) => {
         setBoxes(prev => prev.filter((item, i)=> i!==index));
         setTaskData(prev => ({
         ...prev,
         subTask: prev.subTask.filter((_, i) => i !== index),
         }));
    };

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
    
    const handleBack = ()=> {
          navigation.reset({
                  index: 0,
                  routes: [{name: 'Profile'}], 
          });
    };

    const handleChange = (field:string, value:string) => {

        setTaskData(
            taskData => (
                {...taskData, [field]:value}
            )
        );
    };

    const handleStartDateConfirm = (selectedDate: Date) => {
          setStartDate(selectedDate); 
          setTaskData(prev=>({
          ...prev, 
          toDate: selectedDate.toLocaleString('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}),
          }));  
          hideStartDatePicker();
     };

    const handleSubmit = async () => {
      
         try {
           
           console.log(taskData);
           const isTaskDataEmpty = Object.values(taskData).some(value=>value === '');

           if (isTaskDataEmpty || taskData.subTask.length === 0) {
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
    <SafeAreaView style={complexTaskScreenStyles.taskContainer}>
      <View style={complexTaskScreenStyles.headerContainer}>
          <TouchableOpacity style={complexTaskScreenStyles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text style={complexTaskScreenStyles.headerTxt}>Task Details</Text>    
          <TouchableOpacity style={complexTaskScreenStyles.checkBtn} onPress={handleSubmit}>
            <Ionicons name="checkmark" size={30} color="#ffffff" />
          </TouchableOpacity>        
      </View>
      <View style={complexTaskScreenStyles.bodyContainer}>
          <View style={complexTaskScreenStyles.inputField}>
            <FloatingLabelInput label="Title" value={taskData.title} onChangeText={value=>handleChange('title', value)} containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings1} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
          </View>
          <View style={complexTaskScreenStyles.descriptionField}>
            <FloatingLabelInput  label="Description" value={taskData.description} onChangeText={value=>handleChange('description', value)} isFocused={isDescFocused} onFocus={() => setIsDescFocused(true)} onBlur={() => setIsDescFocused(false)}  multiline={true} containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings2} labelStyles={labelStylesSettings} inputStyles={{
              ...inputStylesSettings, textAlignVertical: 'top', paddingTop: 15, height: 140,}}/> 
          </View>
          <View style={complexTaskScreenStyles.categoryFieldContainer}>
              <Text style={complexTaskScreenStyles.categoryHeader}>Category</Text>
              <View style={complexTaskScreenStyles.categoryBody}>
                 {
                      categories.map(category => (
                         <TouchableOpacity key={category} style={[complexTaskScreenStyles.categoryBox, selectedCategory === category && complexTaskScreenStyles.categoryBoxBtn]} onPress={() => handleCategory(category)}>
                              <Text style={[complexTaskScreenStyles.categoryBoxTxt, selectedCategory === category && complexTaskScreenStyles.categoryBoxTxtEffect]}>{category}</Text>
                        </TouchableOpacity>
                      ))
                 }                           
              </View>
           </View>  
           <View style={complexTaskScreenStyles.subTaskContainer}>
             <View style={complexTaskScreenStyles.subTaskHeader}>
                 <Text style={complexTaskScreenStyles.subTaskHeaderTxt}>Add Steps</Text>
                 <TouchableOpacity style={[{marginLeft: '55%',}]} onPress={()=>setAddSubTaskModalVisible(true)}>
                    <Ionicons name="add" size={34} color="#f0c96d" />
                 </TouchableOpacity>              
             </View>
             <ScrollView>
               {
                taskData.subTask.map((subtask, index) => (                 
                   <View key={`${subtask}-${index}`} style={complexTaskScreenStyles.subTask}>
                      <Text style={complexTaskScreenStyles.subTaskTxt}>{subtask}</Text>
                      {/* if passing an argument, use ()=>functionName(argument) for onPress*/}
                      <TouchableOpacity style={complexTaskScreenStyles.trashBtn} onPress={()=>deleteBox(index)}> 
                        <Ionicons name="trash" size={30} color="#f0c96d" />
                      </TouchableOpacity>            
                   </View>
                ))
               }
             </ScrollView>
           </View>
           <View style={complexTaskScreenStyles.dateContainer}>
                  <View style={complexTaskScreenStyles.startDate}>
                     <Text style={complexTaskScreenStyles.dateTimeHeader}>Due On:  </Text>
                     <TouchableOpacity style={complexTaskScreenStyles.dateTimeContent} onPress={showStartDatePicker}>
                        <Text style={complexTaskScreenStyles.dateTimeContentTxt}>{startDate? startDate.toLocaleString().split(",").join(" ") : 'Select Start Date'}</Text>
                     </TouchableOpacity>
                      <DateTimePickerModal 
                            isVisible={isStartDatePickerVisible} 
                            mode="datetime"
                            onConfirm={handleStartDateConfirm}
                            onCancel={hideStartDatePicker} />
                  </View>
           </View>
      </View>   
      <AddSubTaskModal visible={addSubTaskModalVisible} onClose={()=>setAddSubTaskModalVisible(false)} onSubmit={onSubmit}/>
    </SafeAreaView>
  );

};


export default AddTaskScreen;