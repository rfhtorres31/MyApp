import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, Modal, TouchableOpacity, Animated, Dimensions, Pressable, Easing} from 'react-native';
import searchModalstyle from './searchTaskStyles';


const {height} = Dimensions.get('window');

type searchBarModalProps = {
   visible: boolean,
   onClose: () => void, 
};



const SearchTaskModal = ({visible, onClose}: searchBarModalProps) => {
     
    const slideAnim = useRef(new Animated.Value(height)).current; 

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
    
    return (
      <Modal transparent={true} visible={visible} animationType="none">
        <Pressable style={searchModalstyle.overlay} onPress={onClose}>

          <Animated.View style={[searchModalstyle.modalContainer, {transform:[{translateY:slideAnim}]}]}>
                 
          </Animated.View>
        </Pressable>
      </Modal>
    )



};





export default SearchTaskModal; 