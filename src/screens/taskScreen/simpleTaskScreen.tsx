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
import { RFPercentage } from "react-native-responsive-fontsize";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
     const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
     const categories = ['Personal', 'Work', 'Home', 'Health', 'Bills', 'Shopping'];
     
     const currentDateTime = new Date(); // get the current datetime
     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get the current timezone of the user's device
     const currentTime = currentDateTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTimeZone}); // get the current time

     const handleCategory = (category: string) => {
        setSelectedCategory(prev=>(prev === category ? null : category));
     };
    
     
     const showStartDatePicker = () => setStartDatePickerVisibility(true);
     const hideStartDatePicker = () => setStartDatePickerVisibility(false);

     const showEndDatePicker = () => setEndDatePickerVisibility(true);
     const hideEndDatePicker = () => setEndDatePickerVisibility(false);

     const handleStartDateConfirm = (selectedDate: Date) => {
          console.log(selectedDate);
          setStartDate(selectedDate);
          hideStartDatePicker();
     };

    const handleEndDateConfirm = (selectedDate: Date) => {
          console.log(selectedDate);
          setEndDate(selectedDate);
          hideEndDatePicker();
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
                <View style={simpleTaskScreenStyles.startDateFieldContainer}>
                  <View style={simpleTaskScreenStyles.startDate}>
                     <Text style={simpleTaskScreenStyles.dateTimeHeader}>From</Text>
                     <TouchableOpacity style={simpleTaskScreenStyles.dateTimeContent} onPress={showStartDatePicker}>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{startDate? startDate.toLocaleDateString() : 'Select Start Date'}</Text>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{startDate? startDate.toLocaleTimeString() : ''}</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={simpleTaskScreenStyles.endDate}> 
                     <Text style={simpleTaskScreenStyles.dateTimeHeader}>To</Text>
                     <TouchableOpacity style={simpleTaskScreenStyles.dateTimeContent} onPress={showEndDatePicker}>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{endDate? endDate.toLocaleDateString() : 'Select End Date'}</Text>
                        <Text style={simpleTaskScreenStyles.dateTimeContentTxt}>{endDate? endDate.toLocaleTimeString() : ''}</Text>
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
                <TouchableOpacity style={simpleTaskScreenStyles.submitBtn}>
                  <Text style={[{textAlign: 'center', color: 'white', fontSize: RFPercentage(2.6), fontFamily: 'Raleway-Medium'}]}>Submit</Text>
                </TouchableOpacity>
            </View>
         </SafeAreaView>
     );

      


};


export default SimpleTaskScreen;