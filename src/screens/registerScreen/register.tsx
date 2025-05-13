import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import registerStyle from '../registerScreen/register.styles';
import AuthScreenLayout from '../../layout/authLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../../../assets/icons/g-icon.svg';
import FacebookIcon from '../../../assets/icons/fb-icon.svg';
import { Alert } from 'react-native';


const RegisterScreen = ({ navigation }: any) => {
     
    const [isPasswordhide, setPasswordHide] = useState(true);
    const baseURL = 'http://10.0.2.2:3304';
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
           
          if (formData.email.trim() === '' || formData.fullname.trim() === '' || formData.password.trim() === '' || formData.username.trim() === ''){
               Alert.alert('Missing Information', 'Please fill in all the required inputs');
               throw new Error("One of the form input is empty");
          }
  
          const response = await fetch(`${baseURL}/api/auth/register`, {
                method:'POST',
                headers: {
                  "Content-Type": "application/json",              
                },
                body: JSON.stringify(formData),           
          }); 
          
          const data = await response.json(); // parsed the JSON data from the fetch response

          if (!response.ok){   

             Alert.alert('Oops!', data.details);
             throw new Error(JSON.stringify(data)); // This will go to through the catch block

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