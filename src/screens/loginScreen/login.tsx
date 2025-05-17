import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import loginStyle from '../loginScreen/login.styles';
import AuthScreenLayout from '../../layout/authLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../../../assets/icons/g-icon.svg';
import FacebookIcon from '../../../assets/icons/fb-icon.svg';
import { Alert } from 'react-native';



export const LoginScreen = ({ navigation }: any) => {
     
    const [isPasswordhide, setPasswordHide] = useState(true);
    const baseURL = 'http://10.0.2.2:3304';
    const [loginData, setLoginData] = useState({
            loginInput: '',
            password: '',
    }); 
     
    const handleChange = (field:string, value:string) => {

        setLoginData(
            loginData => (
                {...loginData, [field]:value}
            )
        );
    };
    
   const handleSubmit = async () => {

        try {           
            if (loginData.loginInput.trim() === '' || loginData.password.trim() === '' ){
                 Alert.alert('Missing Information', 'Please fill in all the required inputs');
                 throw new Error("Please fill in all the required input");
            }

            const response = await fetch(`${baseURL}/api/auth/login`, {
                 method: 'POST',
                 headers: {
                    "Content-Type": "application/json",
                 },
                 body: JSON.stringify(loginData),
            });

            const data = await response.json(); // parsed the JSON data from the fetch response
            
            //=== Handle Error Response ===//
            if (!response.ok){   
                Alert.alert('Oops!', data.details);
                throw new Error(JSON.stringify(data)); // convert the errorResponse object to a string
            }

            const authToken = data.token;
            //localStorage.setItem('authToken', authToken);
            console.log(authToken);
                   
        }
        catch (error) {
              console.error(error);
        }

   };

    console.log(loginData);

    return (
       <AuthScreenLayout>
           <View style={loginStyle.loginContainer}>
                  <Text style={loginStyle.header}>Log In</Text>
                  <View style={loginStyle.formContainer}>
                      <View style = {loginStyle.formField}>
                          <TextInput placeholder='Username or Email' value={loginData.loginInput} onChangeText={value=>handleChange('loginInput', value)} placeholderTextColor='#666666' style={loginStyle.inputField} />
                      </View>
                      <View style = {loginStyle.passwordField}>
                          <TextInput secureTextEntry={isPasswordhide} value={loginData.password} placeholder='Password' onChangeText={value=>handleChange('password', value)} placeholderTextColor='#666666' style={loginStyle.inputField} />
                          <TouchableOpacity  onPress={()=>setPasswordHide(!isPasswordhide)} style={loginStyle.eyeBtn}>
                                <Ionicons name={isPasswordhide?'eye':'eye-off'} size={25} color="#4ef2ef"></Ionicons>
                         </TouchableOpacity>
                      </View>
                      <LinearGradient colors={['#4ef2ef', '#2ec7e6', ]} style={[loginStyle.submitBtn]}>
                          {/* The value always for input in event handler prop like onPress is always a function */}
                          <TouchableOpacity onPress={handleSubmit}> 
                             <Text style={loginStyle.submitButtonTxt}>Log In</Text>
                          </TouchableOpacity>
                      </LinearGradient>
                      <View style={loginStyle.signUpTxt}>
                        <Text>or log in with</Text>
                      </View>
                      <View style={[loginStyle.sigInOptions]}>
                            <LinearGradient colors={['#4ef2ef', '#2ec7e6',]} style={[loginStyle.signUpIconBtn]}>
                                    <TouchableOpacity>
                                        <GoogleIcon fill="#ededed" style={loginStyle.gIcon}></GoogleIcon> 
                                    </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient colors={['#4ef2ef', '#2ec7e6',]} style={[loginStyle.signUpIconBtn]}>
                                    <TouchableOpacity>
                                        <FacebookIcon fill="#ededed" style={loginStyle.fbIcon}></FacebookIcon> 
                                    </TouchableOpacity>
                            </LinearGradient>
                      </View>
                      <View style={[loginStyle.registerTxt]}>
                          <Text>Don't have an account yet?  </Text>
                          <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                             <Text style={{color: '#2ec7e6'}}>Sign Up</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
           </View>
       </AuthScreenLayout>
    );


};

