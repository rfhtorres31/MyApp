import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {height, width} = Dimensions.get('window');


//Setting the dimension of each containers
const modalWidth = width * 1;
const modalHeight = height * 0.75;

const titleWidth = modalWidth;
const titleHeight = modalHeight * 0.15;

const detailsWidth = modalWidth;
const detailsHeight = modalHeight * 0.15;

const subTaskWidth = modalWidth;
const subTaskHeight = modalHeight * 0.60;

const viewTaskModalStyle = StyleSheet.create({

      overlay: {
         flex: 1,
         position: 'relative',
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },

      modalContainer: {
        position: 'absolute',
        width: modalWidth,
        height: modalHeight,
        backgroundColor: '#232a31',   
        borderTopLeftRadius: 15,  
        borderTopRightRadius: 15,
      }, 

      title: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1,
        width: titleWidth,
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: RFPercentage(4),
        fontFamily: 'Poppins-Medium',
      }, 

      details: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1,  
        width: detailsWidth,     
        height: detailsHeight,
        flexDirection: 'row',
        justifyContent: 'center'
      },

      calendar: {
        // backgroundColor: 'gray',
        width: detailsWidth * 0.5,
        height: detailsHeight * 1,
        flexDirection: 'row',
        paddingLeft: '4%',
      }, 

      category: {
        // backgroundColor: 'blue',
        width: detailsWidth * 0.5,
        height: detailsHeight *1,
        flexDirection: 'row',
      }, 

      calendarIcn: {
        width: detailsWidth * 0.5 * 0.25,
        height: detailsHeight * 1 * 0.5,
        // borderColor: 'red',
        // borderStyle: 'solid',
        // borderWidth: 1,  
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0c96d'
      },

      calendarDetails: {
        width: detailsWidth * 0.5 * 0.6,
        height: detailsHeight * 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
        // borderWidth: 1, 
        marginLeft: '5%',
      },

      subTask: {
        width: subTaskWidth,
        height: subTaskHeight,
        borderColor: 'blue',
        borderStyle: 'solid',
        borderWidth: 1, 
      },

      subTaskDet: {
       flexDirection: 'row',
      }



});



export default viewTaskModalStyle;