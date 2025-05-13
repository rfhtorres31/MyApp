import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import authStyles from '../layout/authLayout.styles';



const AuthScreenLayout = ({children}: any) => {

    return (
         <SafeAreaView style={authStyles.authContainer}> 
            <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding': 'height'} >
                 <ScrollView>
                       {children}
                 </ScrollView>                      
            </KeyboardAvoidingView>
         </SafeAreaView>
    );


};

export default AuthScreenLayout;