import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import loginStyle from '../loginScreen/login.styles';
// import * as Font from 'expo-font';
import AuthScreenLayout from '../../layout/authLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
    
    
    const [isPasswordhide, setPasswordHide] = useState(true);

    
    return (
       <AuthScreenLayout>
           <View style={loginStyle.loginContainer}>
                  <Text style={loginStyle.header}>Login</Text>
                  <View style={loginStyle.formContainer}>
                      <View style = {loginStyle.formField}>
                          <TextInput placeholder='Username or Email' placeholderTextColor='#080808' style={loginStyle.inputField} />
                      </View>
                      <View style = {loginStyle.formField}>
                          <TextInput placeholder='Password' secureTextEntry={isPasswordhide} placeholderTextColor='#080808' style={loginStyle.inputField} />
                          <TouchableOpacity  onPress={()=>setPasswordHide(!isPasswordhide)} style={loginStyle.eyeBtn}>
                                <Ionicons name={isPasswordhide?'eye':'eye-off'} size={25} color="black"></Ionicons>
                         </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={loginStyle.submitBtn}>
                            <Text style={loginStyle.submitButtonTxt}>Log In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={loginStyle.sigInGoogleBtn}>
                            <Image source={require('../../../assets/icons/google-icon-dark.png')} style={loginStyle.gIcon}/>
                            <Text style={loginStyle.submitButtonTxt}>Login with Google</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                            <Text style={loginStyle.forgotPasswordLinkTxt}>Trouble Signing In?</Text>
                      </TouchableOpacity>
                  </View>
           </View>
       </AuthScreenLayout>
    );


};


export default LoginScreen;