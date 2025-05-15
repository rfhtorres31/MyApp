import { StyleSheet  } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";





const homeStyle = StyleSheet.create({

     logoContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
      //   borderColor: 'red',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
        
     }, 

     logoTxt: {
        marginTop: '-30%',
        fontSize: RFPercentage(7),
        fontFamily: 'Roboto-Thin',
        color: 'white',
      //   borderColor: 'blue',
      //   borderWidth: 2,
      //   borderStyle: 'solid',
     },



});

export default homeStyle;
