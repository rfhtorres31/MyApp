import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import registerStyle from '../registerScreen/register.styles';
import AuthScreenLayout from '../../layout/authLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../../../assets/icons/g-icon.svg';
import FacebookIcon from '../../../assets/icons/fb-icon.svg';
import { Alert } from 'react-native';
import { BACKEND_URL, BACKEND_URL_2 } from '@env';
import { RootStackParamList } from '../../navigation/screenNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import validator from 'validator';


type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>; // This tells the app that hey, im in the Home route and i want to know what other routes I can go into
type Props = {navigation:RegisterScreenNavigationProp};


const RegisterScreen = ({ navigation }: Props) => {
     
    const [isPasswordhide, setPasswordHide] = useState(true);
    const [formData, setFormData] = useState({
           fullname: '',
           username: '',
           email: '',
           password: '',
    });
    
    const handleChange = (field:string, value:string) => {

        setFormData(
            formData => (
                {...formData, [field]:value}
            )
        );
    };

    
    const handleSubmit = async () => {
       
       try {      

          // Form Validation
          if (formData.email.trim() === '' || formData.fullname.trim() === '' || formData.password.trim() === '' || formData.username.trim() === ''){
               Alert.alert('Missing Information', 'Please fill in all the required inputs');
               return;
          }

          else if (!validator.isEmail(formData.email)) {
             Alert.alert('Format', 'Wrong email address format');
             return;
          }

          // formData sent to the backend thru API call
          const response = await fetch(`${BACKEND_URL_2}/api/auth/register`, {
                method:'POST',
                headers: {
                  "Content-Type": "application/json",              
                },
                body: JSON.stringify(formData),           
          }); 
          
          // parsed the JSON data from the fetch response
          const data = await response.json(); 

          if (!response.ok){   

             Alert.alert('Oops!', data.details);
             throw new Error(JSON.stringify(data)); 
          }

          console.log(data);
          navigation.navigate('Login')     
       }
       catch (error: any) {
           console.error(error);       
       }  
   
   };


    return (
       <AuthScreenLayout>
           <View style={registerStyle.registerContainer}>
                  <Text style={registerStyle.header}>Sign Up</Text>
                  <View style={registerStyle.formContainer}>
                     <View style = {registerStyle.formField}>
                          <TextInput placeholder='Name' value={formData.fullname} onChangeText={value=>handleChange('fullname', value)} placeholderTextColor='#666666' style={registerStyle.inputField} />
                     </View>
                     <View style = {registerStyle.formField}>
                          <TextInput placeholder='Username' value={formData.username} onChangeText={value=>handleChange('username', value)} placeholderTextColor='#666666' style={registerStyle.inputField} />
                     </View>
                     <View style = {registerStyle.formField}>
                          <TextInput placeholder='Email' value={formData.email} onChangeText={value=>handleChange('email', value)} placeholderTextColor='#666666' keyboardType="email-address" style={registerStyle.inputField} />
                     </View>
                     <View style = {registerStyle.passwordField}>
                          <TextInput secureTextEntry={isPasswordhide} value={formData.password} placeholder='Password' onChangeText={value=>handleChange('password', value)} placeholderTextColor='#666666' style={registerStyle.inputField} />
                          <TouchableOpacity  onPress={()=>setPasswordHide(!isPasswordhide)} style={registerStyle.eyeBtn}>
                                <Ionicons name={isPasswordhide?'eye':'eye-off'} size={25} color="#4ef2ef"></Ionicons>
                         </TouchableOpacity>
                     </View>

                     <LinearGradient colors={['#4ef2ef', '#2ec7e6', ]} style={[registerStyle.submitBtn]}>
                          {/* The value always for input in event handler prop like onPress is always a function */}
                          <TouchableOpacity onPress={handleSubmit}> 
                             <Text style={registerStyle.submitButtonTxt}>Sign Up</Text>
                          </TouchableOpacity>
                     </LinearGradient>
                     <View style={registerStyle.signUpTxt}>
                        <Text>or sign up with</Text>
                     </View>
                     <View style={[registerStyle.sigInOptions]}>
                            <LinearGradient colors={['#4ef2ef', '#2ec7e6',]} style={[registerStyle.signUpIconBtn]}>
                                    <TouchableOpacity>
                                        <GoogleIcon fill="#ededed" style={registerStyle.gIcon}></GoogleIcon> 
                                    </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient colors={['#4ef2ef', '#2ec7e6',]} style={[registerStyle.signUpIconBtn]}>
                                    <TouchableOpacity>
                                        <FacebookIcon fill="#ededed" style={registerStyle.fbIcon}></FacebookIcon> 
                                    </TouchableOpacity>
                            </LinearGradient>
                     </View>
                     <View style={[registerStyle.loginTxt]}>
                          <Text>already have an account?  </Text>
                          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                             <Text style={{color: '#2ec7e6'}}>Log In</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
           </View>
       </AuthScreenLayout>
    );


};


export default RegisterScreen;