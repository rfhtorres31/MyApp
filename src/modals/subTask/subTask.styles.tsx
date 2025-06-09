import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


const {width, height} = Dimensions.get('window');

const modalHeight = height * 0.25;
const modalWidth = width * 0.85;

const bodyHeight = modalHeight * 0.8;
const bodyWidth = modalWidth * 1;

export const subTaskModalStyle = StyleSheet.create({

    overlay: {
         flex: 1,
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         justifyContent: 'center',
         alignItems: 'center',
      },

    main: {
        width: modalWidth,
        height: modalHeight,
        backgroundColor: '#212832',
        borderRadius: 15,
      }, 

    header: {
        flexDirection: 'row',
        height: bodyHeight * 0.3,
        width: bodyWidth,
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid',      
    },

    close: {
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid', 
        marginTop: '2%',    
        marginLeft: '85%', 
    }, 

    body: {
        height: bodyHeight,
        width: bodyWidth,
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid',
        alignItems: 'center'
    },

    subTaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#455a64',
        width: bodyWidth * 0.95,
        height: bodyHeight * 0.4,
        paddingLeft: '2.3%',
        borderRadius: 15,
    },

    subTaskInput: {
        width: '85%',
        height: '100%',
        marginLeft: '2%',
        backgroundColor: '#455a64',
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid',       
        color: 'white',
        fontSize: RFPercentage(2.7),
        fontFamily: 'Poppins-Regular',
    },

    submit: {
       marginTop: '7%',
    },

    submitTxt: {
        color: 'white',
        fontSize: RFPercentage(3),
    }



});