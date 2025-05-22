import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window');

const modalHeight = height * 0.45;
const modalWidth = width * 0.8;

const headerHeight = modalHeight * 0.2;
const headerWidth = modalWidth * 1;

const bodyHeight = modalHeight * 0.8;
const bodyWidth = modalWidth * 1;

export const taskModalStyle = StyleSheet.create({
    
      overlay: {
         flex: 1,
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         justifyContent: 'center',
         alignItems: 'center',
      },

      main: {
        width: modalWidth,
        height: modalHeight,
        backgroundColor: 'white',
        borderRadius: 15,

      }, 

      headerContainer: {
        position: 'relative',
        height: headerHeight,
        width: headerWidth,
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid',  
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center',   
        paddingTop: '3%',
      },

      headerTxt: {
        fontSize: RFPercentage(3),
        // borderWidth: 2,
        // borderColor: 'red',
        // borderStyle: 'solid',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginLeft: '1.8%',
      }, 

      bodyContainer: {
        width: bodyWidth,
        height: bodyHeight,
        // borderWidth: 2,
        // borderColor: 'blue',
        // borderStyle: 'solid',
        alignItems: 'center',
        paddingTop: '5%'
      },

    taskBtn: {
        width: bodyWidth * 0.7,  // match shadowSettings
        height: bodyHeight * 0.35, // match shadowSettings
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eafcff',
        borderRadius: 15,
        padding: 5,
        marginBottom: 25,
    },

      taskHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',   
      },

      taskTitle: {
        fontSize: RFPercentage(2.8),
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginLeft: '2%',
      }, 

      taskDesc: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: '#4a4a4a',
      },

      closeBtn: {
        position: 'absolute',
        top: '13%',
        left: '90%'
      }

});


export const shadowSettings = {
  distance: 10,
  offset: [0, 10] as [number, number],
  startColor: '#00000020',
  radius: 15,
  containerViewStyle: {
    width: bodyWidth * 0.7,
    height: bodyHeight * 0.3,
  },
};

