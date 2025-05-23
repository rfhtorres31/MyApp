import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {taskModalStyle, shadowSettings} from './addTaskStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

type AddTaskTypeModalProps = {
   visible: boolean,
   onClose: () => void, // this property can have a function that returns nothing/void
};


const AddTaskTypeModal = ({visible, onClose}: AddTaskTypeModalProps) => {

   

  return (
     <Modal transparent={true} visible={visible} animationType="fade">
         <View style={taskModalStyle.overlay}>
            <View style={taskModalStyle.main}>
                <View style={taskModalStyle.headerContainer}>
                     <Ionicons name="create-outline" size={22} color="#000"/>
                     <Text style={taskModalStyle.headerTxt}>Create Task</Text>
                     <TouchableOpacity style={taskModalStyle.closeBtn} onPress={onClose}>
                        <Ionicons name="close" size={22} color="#000"/>
                     </TouchableOpacity>
                </View>
                <View style={taskModalStyle.bodyContainer}>
                    <Shadow {...shadowSettings}>
                      <TouchableOpacity style={taskModalStyle.taskBtn}>                 
                         <View style={taskModalStyle.taskHeader}>
                            <Ionicons name="checkmark-circle-outline" size={22} color="#000"/> 
                            <Text style={taskModalStyle.taskTitle}>Simple Task</Text>  
                         </View>
                        <Text style={taskModalStyle.taskDesc}>Quick reminder with just a title and due date</Text>                                                         
                      </TouchableOpacity>
                    </Shadow>
                    <Shadow {...shadowSettings}>
                      <TouchableOpacity style={taskModalStyle.taskBtn}>
                        <View style={taskModalStyle.taskHeader}>
                            <Ionicons name="layers-outline" size={22} color="#000"/> 
                            <Text style={taskModalStyle.taskTitle}>Complex Task</Text>  
                        </View>
                        <Text style={taskModalStyle.taskDesc}>Includes subtasks, progress tracking, and more</Text>                                       
                      </TouchableOpacity>
                    </Shadow>
                </View>           
            </View>
         </View>
     </Modal>
  );



};



export default AddTaskTypeModal;