import React from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {subTaskModalStyle} from './subTask.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';


type AddSubTaskModalProps = {
   visible: boolean,
   onClose: () => void,
   addBox: () => void,
};


const AddSubTaskModal = ({visible, onClose, addBox}: AddSubTaskModalProps) => {


   return (
      <Modal transparent={true} visible={visible} animationType="fade">
         <View style={subTaskModalStyle.overlay}>
           <View style={subTaskModalStyle.main}>
               <View style={subTaskModalStyle.body}>
                  <View style={subTaskModalStyle.header}>
                    <TouchableOpacity style={subTaskModalStyle.close} onPress={onClose}>
                      <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={subTaskModalStyle.subTaskContainer}>
                    <Ionicons name="ellipse-outline" size={30} color="#fff" />
                    <TextInput style={subTaskModalStyle.subTaskInput} placeholder="Enter details" placeholderTextColor="#fff"/>
                  </View>
                  <TouchableOpacity style={subTaskModalStyle.submit} onPress={addBox}> 
                      <Text style={subTaskModalStyle.submitTxt}>Add</Text>
                  </TouchableOpacity>
               </View>
           </View>
         </View>
      </Modal>
   );
};






export default AddSubTaskModal;