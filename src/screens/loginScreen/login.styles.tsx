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
        // borderWidth: 2,
        // borderColor: 'blue',
        // borderStyle: 'solid',
     },

     inputField: {
        width: '100%',
        borderBottomWidth: 1,
        paddingBottom: 4,
        fontSize: RFPercentage(2.4),
        fontFamily: 'Roboto-Light',
     },

     passwordField: {
        width: '90%',
        height: '13%',
        position: 'relative',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
      //   borderColor: 'red',        
     },
     
     eyeBtn: {
        position: 'absolute',
        top: '42%',
        left: '95%',
        transform: [
         {translateX: '-50%'},
         {translateY: '-50%'},
        ]
     },

     submitBtn: {
        borderRadius: 10,
        backgroundColor: 'black',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',      
     },

     submitButtonTxt: {
       fontSize: RFPercentage(2.7),
       fontFamily: 'Roboto-Light',
       color: 'white',
     },
     
     sigInGoogleBtn: {
        position: 'relative',
        borderRadius: 10,
        backgroundColor: 'black',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',  
        padding: 0,
     }, 


     forgotPasswordLinkTxt: {
       fontSize: RFPercentage(2.5),
       fontFamily: 'Roboto-Light',
       color: '#060891',
       textDecorationLine: 'underline',
     }, 

     gIcon: {
        position: 'absolute',
        top: '50%',
        left: '20%',
        transform: [
            {translateX: '-50%'},
            {translateY: '-50%'}
        ],
        width: 35,
        height: 23, 
     },
   
});


export default loginStyle;