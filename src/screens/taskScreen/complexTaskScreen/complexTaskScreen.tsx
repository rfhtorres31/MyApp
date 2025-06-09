import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/screenNavigation';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {complexTaskScreenStyles, descriptionContainerStylesSettings, containerStylesSettings, customLabelStylesSettings2, customLabelStylesSettings1, labelStylesSettings, inputStylesSettings} from './complexTaskScreen.styles';
import AddSubTaskModal from '../../../modals/subTask/subTask';


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
    const [addSubTaskModalVisible, setAddSubTaskModalVisible] = useState(false);
    const [boxes, setBoxes] = useState<number[]>([]);
    const [isDescFocused, setIsDescFocused] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // this means that this can hold either string or null value
    
    const addBox = () => {
         setBoxes(prev=>[...prev, prev.length + 1]);
    }; 

    const deleteBox = (index: number) => {
         setBoxes(prev => prev.filter((item, i)=> i!==index));
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

  return (
    <SafeAreaView style={complexTaskScreenStyles.taskContainer}>
      <View style={complexTaskScreenStyles.headerContainer}>
          <TouchableOpacity style={complexTaskScreenStyles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text style={complexTaskScreenStyles.headerTxt}>Task Details</Text>            
      </View>
      <View style={complexTaskScreenStyles.bodyContainer}>
          <View style={complexTaskScreenStyles.inputField}>
            <FloatingLabelInput label="Title" value={taskData.title} onChangeText={value=>handleChange('title', value)} containerStyles={containerStylesSettings} customLabelStyles={customLabelStylesSettings1} labelStyles={labelStylesSettings} inputStyles={inputStylesSettings}/> 
          </View>
          <View style={complexTaskScreenStyles.descriptionField}>
            <FloatingLabelInput  label="Description" isFocused={isDescFocused} onFocus={() => setIsDescFocused(true)} onBlur={() => setIsDescFocused(false)} value={taskData.description} onChangeText={value=>handleChange('description', value)} multiline={true} containerStyles={descriptionContainerStylesSettings} customLabelStyles={customLabelStylesSettings2} labelStyles={labelStylesSettings} inputStyles={{
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
                boxes.map((box, index) => (                 
                   <View style={complexTaskScreenStyles.subTask}>
                    <TextInput style={complexTaskScreenStyles.subTaskTxt}>HEHE</TextInput>
                    {/* if passing an argument, use ()=>functionName(argument) for onPress*/}
                    <TouchableOpacity style={[{marginLeft: '80%'}]} onPress={()=>deleteBox(index)}> 
                      <Ionicons name="trash" size={30} color="#f0c96d" />
                    </TouchableOpacity>            
                   </View>
                ))
               }
             </ScrollView>

           </View>
      </View>   
      <AddSubTaskModal visible={addSubTaskModalVisible} onClose={()=>setAddSubTaskModalVisible(false)} addBox={addBox}/>
    </SafeAreaView>
  );

};


export default ComplexTaskScreen;