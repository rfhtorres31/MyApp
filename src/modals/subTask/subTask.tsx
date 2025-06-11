import React, { useState } from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {subTaskModalStyle} from './subTask.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';


type AddSubTaskModalProps = {
   visible: boolean,
   onClose: () => void,
   onSubmit: (details: string) => void,
};


const AddSubTaskModal = ({visible, onClose, onSubmit}: AddSubTaskModalProps) => {
   
   const [details, setDetails] = useState("");

   const handleChange = (value:string) => {
          setDetails(value); 
   };

   return (
      <Modal transparent={true} visible={visible} animationType="fade">
         <View style={subTaskModalStyle.overlay}>
           <View style={subTaskModalStyle.main}>
               <View style={subTaskModalStyle.body}>
                  <View style={subTaskModalStyle.header}>
                    <Text style={subTaskModalStyle.headerTxt}>SubTask</Text>
                    <TouchableOpacity style={subTaskModalStyle.close} onPress={onClose}>
                      <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={subTaskModalStyle.subTaskContainer}>
                    <Ionicons name="ellipse-outline" size={30} color="#fff" />
                    <TextInput style={subTaskModalStyle.subTaskInput} value = {details} onChangeText={value=>handleChange(value)} placeholder="Enter Details" placeholderTextColor="#fff"/>
                  </View>
                  <TouchableOpacity style={subTaskModalStyle.submit} onPress={()=>{
                     onSubmit(details);
                     setDetails("");
                  }}> 
                      <Text style={subTaskModalStyle.submitTxt}>Add</Text>
                  </TouchableOpacity>
               </View>
           </View>
         </View>
      </Modal>
   );
};






export default AddSubTaskModal;