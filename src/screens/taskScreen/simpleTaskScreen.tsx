import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import {simpleTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings, labelStylesSettings, inputStylesSettings} from './simpleTaskScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { FloatingLabelInput } from 'react-native-floating-label-input';

type SimpleTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SimpleTask'>;
type Props = {
    navigation:SimpleTaskScreenNavigationProp,
};


const SimpleTaskScreen = ({navigation}:Props) => {
      
     const [value, setValue] = useState('');

     return (
         <SafeAreaView style={simpleTaskScreenStyles.taskContainer}>
            <View style={simpleTaskScreenStyles.headerContainer}>
                <TouchableOpacity style={simpleTaskScreenStyles.backBtn}>
                    <Ionicons name="arrow-back-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={simpleTaskScreenStyles.headerTxt}>Add Task</Text>            
            </View>
            <View style={simpleTaskScreenStyles.bodyContainer}>
                <View style={simpleTaskScreenStyles.inputField}>
                  <FloatingLabelInput value={value} onChangeText={setValue} label="Title" containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.descriptionField}>
                  <FloatingLabelInput value={value} onChangeText={setValue} label="Description" multiline containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
                </View>
                <View style={simpleTaskScreenStyles.categoryFieldContainer}>
                  <Text style={simpleTaskScreenStyles.categoryHeader}>Category</Text>
                  <View style={simpleTaskScreenStyles.categoryBody}>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Personal</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Work</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Home</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Health</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Bills</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={simpleTaskScreenStyles.categoryBox}>
                       <Text style={simpleTaskScreenStyles.categoryBoxTxt}>Shopping</Text>
                     </TouchableOpacity>
                  </View>
                </View>
            </View>
         </SafeAreaView>
     );

      


};


export default SimpleTaskScreen;