import { StyleSheet  } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";




const homeStyle = StyleSheet.create({
  
     homeContainer: {
        flex: 1,       
        justifyContent: 'center',   
     },

     logoContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '-10%',
        // borderColor: 'red',
        // borderWidth: 2,
        // borderStyle: 'solid',     
     }, 

     logoTxt1: {
        marginTop: '-20%',
        fontSize: RFPercentage(6),
        fontFamily: 'Poppins-Light',
        fontWeight: '700',
        color: 'white',
        // borderColor: 'blue',
        // borderWidth: 2,
        // borderStyle: 'solid',
     },

     logoTxt2: {
      marginTop: '-20%',
      fontSize: RFPercentage(6),
      fontFamily: 'Poppins-Light',
      color: 'white',
      // borderColor: 'blue',
      // borderWidth: 2,
      // borderStyle: 'solid',
   },

});

export default homeStyle;
