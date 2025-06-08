import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/screenNavigation';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {complexTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings, labelStylesSettings, inputStylesSettings} from './complexTaskScreen.styles';


type ComplexTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ComplexTask'>;
type Props = {
    navigation:ComplexTaskScreenNavigationProp,
};

const ComplexTaskScreen = ({navigation}:Props) => {

    const [taskData, setTaskData] = useState({
           title: '',
           description: '',
           category: '',
           fromDate: '',
           toDate: '',
    }); 

    const categories = ['Personal', 'Work', 'Home', 'Health', 'Bills', 'Shopping'];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // this means that this can hold either string or null value

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

  return (
    <SafeAreaView style={complexTaskScreenStyles.taskContainer}>
      <View style={complexTaskScreenStyles.headerContainer}>
          <TouchableOpacity style={complexTaskScreenStyles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text style={complexTaskScreenStyles.headerTxt}>Add Task</Text>            
      </View>
      <View style={complexTaskScreenStyles.bodyContainer}>
          <View style={complexTaskScreenStyles.inputField}>
            <FloatingLabelInput label="Title" value={taskData.title} onChangeText={value=>handleChange('title', value)} containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
          </View>
          <View style={complexTaskScreenStyles.descriptionField}>
            <FloatingLabelInput  label="Description" value={taskData.description} onChangeText={value=>handleChange('description', value)} multiline containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
          </View>
          <View style={complexTaskScreenStyles.categoryFieldContainer}>
              <Text style={complexTaskScreenStyles.categoryHeader}>Category</Text>
              <View style={complexTaskScreenStyles.categoryBody}>
                 {
                      categories.map(category => (
                         <TouchableOpacity key={category} style={[complexTaskScreenStyles.categoryBox, selectedCategory === category && complexTaskScreenStyles.categoryBoxBtn]} onPress={() => handleCategory(category)}>
                              <Text style={complexTaskScreenStyles.categoryBoxTxt}>{category}</Text>
                        </TouchableOpacity>
                      ))
                 }                           
              </View>
           </View>
      </View>     
    </SafeAreaView>
  );

};


export default ComplexTaskScreen;