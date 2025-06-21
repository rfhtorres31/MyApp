import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity, Animated, Dimensions, Pressable, Easing} from 'react-native';
import viewTaskModalStyle from './viewTask.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { taskObjFormat } from '../../screens/profileScreen/profile';
import CheckBox from '@react-native-community/checkbox';

const {height} = Dimensions.get('window');

type searchBarModalProps = {
   visible: boolean,
   onClose: () => void, 
   taskObj : taskObjFormat | null,
};


const ViewTaskModal = ({visible, onClose, taskObj}: searchBarModalProps) => {
     
    const slideAnim = useRef(new Animated.Value(height)).current; 
    
    const subTaskObj = taskObj?.SubTask;

    useEffect(()=>{
       
      if (visible) {

        Animated.timing(slideAnim, {
           toValue: height * 0.25,
           easing: Easing.out(Easing.ease),
           duration: 1000,
           useNativeDriver: true,
        }).start();

      }

      else {
        Animated.timing(slideAnim, {
           toValue: height,
           duration: 4000,
           easing: Easing.out(Easing.ease),
           useNativeDriver: true,
        }).start();
      }  

    }, [visible]); // this visible is placed here so that the useEffect will run everytime this variable change. Its like saying, Hey react! everytime visible variable change, run the animation code inside the useEffect.
    

    const updateSubTask = async () =>{


    };



    return (
      <Modal transparent={true} visible={visible} animationType="none">
        <Pressable style={viewTaskModalStyle.overlay} onPress={onClose}>
          <Animated.View style={[viewTaskModalStyle.modalContainer, {transform:[{translateY:slideAnim}]}]}>
            <Text style={viewTaskModalStyle.title}>{taskObj?.title}</Text>
            <View style={viewTaskModalStyle.details}>
               <View style={viewTaskModalStyle.calendar}>
                  <View style={viewTaskModalStyle.calendarIcn}>
                     <Ionicons name="calendar-outline" size={24} color="#000" />
                  </View>
                  <View style={viewTaskModalStyle.calendarDetails}>
                     <Text style={[{color: '#b3eaff', fontSize: RFPercentage(2.1), fontFamily: 'Poppins-Medium', padding:0,}]}>Due Date</Text>
                     <Text style={[{color: 'white', fontSize: RFPercentage(2.7), fontFamily: 'Poppins-Medium', marginTop: '-6%'}]}>{taskObj?.due_date}</Text>
                  </View>
               </View>
               <View style={viewTaskModalStyle.category}>
                  <View style={viewTaskModalStyle.calendarIcn}>
                     <Ionicons name="grid" size={24} color="#000" />
                  </View>
                  <View style={viewTaskModalStyle.calendarDetails}>
                     <Text style={[{color: '#b3eaff', fontSize: RFPercentage(2.1), fontFamily: 'Poppins-Medium', padding:0,}]}>Category</Text>
                     <Text style={[{color: 'white', fontSize: RFPercentage(2.7), fontFamily: 'Poppins-Medium', marginTop: '-6%'}]}>{taskObj?.category}</Text>
                  </View>    
               </View>
            </View>
            <View style={viewTaskModalStyle.subTask}>
               { 
                  subTaskObj?.map(task => (

                        <View style={viewTaskModalStyle.subTaskDet}>
                           <CheckBox value={task.isCompleted} onValueChange={updateSubTask} tintColors={{ true: '#f0c96d', false: '#ccc' }}/>
                           <Text>{task?.sub_task}</Text>                 
                        </View>
                  ))
               }        
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    )



};





export default ViewTaskModal; 