import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


const {width, height} = Dimensions.get('window');

const loginContainerWidth = width * 1;
const loginContainerHeight = height * 0.7;



const loginStyle = StyleSheet.create({
     
     loginContainer: {  
         width: loginContainerWidth,
         height: loginContainerHeight,      
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         // borderWidth: 2,
         // borderColor: 'blue',
         // borderStyle: 'solid',
         gap: height * 0.01,
         marginTop: '10%',
     },
     
     header: {
         marginTop: loginContainerHeight * 0.02,
         fontSize: RFPercentage(4), // This is based on screen height, 2 means 2% of screen height
         fontFamily: 'Roboto-Thin',
     },

     formContainer: {
        width: loginContainerWidth,
        height: loginContainerHeight, 
        flex: 1,
        alignItems: 'center',
      //   borderWidth: 2,
      //   borderColor: 'orange',
      //   borderStyle: 'solid',
        gap: height * 0.03,
        paddingTop: 17,
     },
     
     formField: {
        width: '90%',
        height: '13%',
        backgroundColor: '#e0fafa',
        // borderWidth: 2,
        // borderColor: 'blue',
        // borderStyle: 'solid',
     },

     inputField: {
        width: '100%',
        height: '100%',
      //   borderWidth: 1,
        paddingBottom: 4,
        paddingLeft: 15,
        fontSize: RFPercentage(2.8),
        fontFamily: 'Poppins-Light',  
     },

     passwordField: {
        width: '90%',
        height: '13%',
        position: 'relative',
        backgroundColor: '#e0fafa',
        borderRadius: 15,
      //   borderWidth: 2,
      //   borderStyle: 'solid',
      //   borderColor: 'red',        
     },

     eyeBtn: {
        position: 'absolute',
        top: '50%',
        left: '95%',
        transform: [
         {translateX: '-50%'},
         {translateY: '-50%'},
        ]
     },

     submitBtn: {
        borderRadius: 10,
        backgroundColor: 'black',
        width: '75%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',      
     },

     submitButtonTxt: {
       fontSize: RFPercentage(2.8),
       fontFamily: 'Poppins-Thin',
       color: '#ededed',
     },

     signUpTxt: {
      //   borderColor: 'red',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
        marginBottom: -12,
     },

     sigInOptions: {
      //   borderColor: 'red',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: -10,
     },

     signUpIconBtn: {
        borderRadius: 25,
        backgroundColor: 'black',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',  
        padding: 0,
      //   borderColor: 'red',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
     }, 

     gIcon: {
        width: 40,
        height: 25, 
        color: '#ededed'
     },

     fbIcon: {
        width: 40,
        height: 25, 
        color: '#ededed'
     },

    registerTxt: {
      //         borderColor: 'red',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
         flexDirection: 'row',     
     },
   
});


export default loginStyle;