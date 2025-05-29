import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import {simpleTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings, labelStylesSettings, inputStylesSettings} from './simpleTaskScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DateTimePicker from '@react-native-community/datetimepicker';

type SimpleTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SimpleTask'>;
type Props = {
    navigation:SimpleTaskScreenNavigationProp,
};


const SimpleTaskScreen = ({navigation}:Props) => {
      
     const [date, setDate] = useState<Date | null>(null);
     const [time, setTime] = useState<Date | null>(null);
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // this means that this can hold either string or null value
     const [showDate, setShowDate] = useState(false);
     const [showTime, setShowTime] = useState(false);
     const categories = ['Personal', 'Work', 'Home', 'Health', 'Bills', 'Shopping'];
     
     const currentDateTime = new Date(); // get the current datetime
     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get the current timezone of the user's device
     const currentTime = currentDateTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}); // get the current time

     const handleCategory = (category: string) => {
        setSelectedCategory(prev=>(prev === category ? null : category));
     };
    
     // DateTimePicker Component throws two arguments, event which tells the behaviour of the user and the selected date                             
     // Optional Chaining (?) here is used, since selectedDate can be null or has value. This prevents TypeError: Cannot read properties of undefined (reading 'toISOString')
     const onChangeDate = (event: any, selectedDate?: Date) => {

         // If user selects ok, event.type==='set', if not, event.type==='dismissed'
         if (event.type === 'set' && selectedDate) {
             setDate(selectedDate);        
         }     
         setShowDate(false);
     };

     const onChangeTime= (event: any, selectedTime?: Date) => {

         // If user selects ok, event.type==='set', if not, event.type==='dismissed'
         if (event.type === 'set' && selectedTime) {
             setTime(selectedTime);        
         }     
         setShowTime(false);
     };

     return (
         <SafeAreaView style={simpleTaskScreenStyles.taskContainer}>
            <View style={simpleTaskScreenStyles.headerContainer}>
                <TouchableOpacity style={simpleTaskScreenStyles.backBtn} >
                    <Ionicons name="arrow-back-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={simpleTaskScreenStyles.headerTxt}>Add Task</Text>            
            </View>
            <View style={simpleTaskScreenStyles.bodyContainer}>
                <View style={simpleTaskScreenStyles.inputField}>
                  <FloatingLabelInput label="Title" containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.descriptionField}>
                  <FloatingLabelInput  label="Description" multiline containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.categoryFieldContainer}>
                  <Text style={simpleTaskScreenStyles.categoryHeader}>Category</Text>
                  <View style={simpleTaskScreenStyles.categoryBody}>
                     {
                      categories.map(category=>(
                         <TouchableOpacity key={category} style={[simpleTaskScreenStyles.categoryBox, selectedCategory === category && simpleTaskScreenStyles.categoryBoxBtn]} onPress={() => handleCategory(category)}>
                              <Text style={simpleTaskScreenStyles.categoryBoxTxt}>{category}</Text>
                         </TouchableOpacity>
                      ))
                     }
                  </View>
                </View>
                <View style={simpleTaskScreenStyles.dateField}>
                   <Text style={simpleTaskScreenStyles.dateFieldTxt}>Start Date</Text>
                   <TouchableOpacity style={simpleTaskScreenStyles.dateFieldBtnField} onPress={()=>setShowDate(prev=>!prev)}>
                        <Text>{date ? date.toDateString(): new Date().toDateString()}</Text>
                   </TouchableOpacity>
                   {/* value props of DateTimePicker always expect a Date format if the date doesn't have value, put the current date */}
                   {showDate && <DateTimePicker value={date || new Date()} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChangeDate}/>}
                </View>
                <View style={simpleTaskScreenStyles.dateField}>
                   <Text style={simpleTaskScreenStyles.dateFieldTxt}>Start Time</Text>
                   <TouchableOpacity style={simpleTaskScreenStyles.dateFieldBtnField} onPress={()=>setShowDate(prev=>!prev)}>
                        <Text>{date ? date.toDateString(): currentTime}</Text>
                   </TouchableOpacity>
                   {/* value props of DateTimePicker always expect a Date format if the date doesn't have value, put the current date */}
                   {showDate && <DateTimePicker value={time || new Date()} mode="time" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChangeTime}/>}
                </View>
            </View>
         </SafeAreaView>
     );

      


};


export default SimpleTaskScreen;