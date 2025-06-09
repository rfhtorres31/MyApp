import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window');

const headerContainerHeight = height * 0.07;
const headerContainerWidth = width * 1;

const bodyHeight = height * 0.93;
const bodyWidth = width * 1;

const categoryFieldContainerHeight = bodyHeight * 0.22;
const categoryFieldContainerWidth = bodyWidth * 1;

const subTaskContainerHeight = bodyHeight * 0.3;
const subTaskContainerWidth = bodyWidth * 1;

export const complexTaskScreenStyles = StyleSheet.create({
     
    taskContainer: {
           flex: 1,    
           backgroundColor: '#212832',  
     }, 

     headerContainer: {
       position: 'relative',
       height: headerContainerHeight,
       width: headerContainerWidth,
       borderColor: 'red',
       borderWidth: 2,
       borderStyle: 'solid',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
     },

     backBtn: {
       position: 'absolute',
       left: '2%',
       borderColor: 'red',
       borderWidth: 2,
       borderStyle: 'solid',
     }, 

    headerTxt: {
       position: 'absolute', 
       borderColor: 'red',
       borderWidth: 2,
       borderStyle: 'solid',
       fontSize: RFPercentage(3.3),
       fontFamily: 'Raleway-Regular',
       color: '#ffffff',
     },

     bodyContainer: {
       height: bodyHeight,
       width: bodyWidth,
       borderColor: 'blue',
       borderWidth: 2,
       borderStyle: 'solid',
       alignItems: 'center',
     },

    inputField: {
       height: bodyHeight * 0.13,
       width: bodyWidth * 0.96,
       borderColor: 'orange',
       borderWidth: 2,
       borderStyle: 'solid',
     },

    descriptionField: {
       height: bodyHeight * 0.25,
       width: bodyWidth * 0.96,
       borderColor: 'orange',
       borderWidth: 2,
       borderStyle: 'solid',
     },

     categoryFieldContainer: {
       height: categoryFieldContainerHeight,
       width: categoryFieldContainerWidth,
       borderColor: 'orange',
       borderWidth: 2,
       borderStyle: 'solid',
     },

     categoryHeader: {
       height: categoryFieldContainerHeight * 0.2,
       width: categoryFieldContainerWidth,
       fontSize: RFPercentage(3),
       fontFamily: 'Raleway-Medium',
       marginLeft: '4.6%',
       color: 'white',
       marginBottom: '1%',
       borderColor: 'orange',
       borderWidth: 2,
       borderStyle: 'solid',
     },

     categoryBody: {
       height: categoryFieldContainerHeight * 0.8,
       width: categoryFieldContainerWidth,
       borderColor: 'blue',
       borderWidth: 2,
       borderStyle: 'solid',
       flexDirection: 'row',
       flexWrap: 'wrap',
       paddingTop: '2%',
     },

     categoryBox: {
       height: categoryFieldContainerHeight * 0.8 * 0.35,
       width: bodyWidth * 0.31,
       backgroundColor: '#455a64',
       borderWidth: 0.5,
       borderStyle: 'solid',
       marginLeft: '1.5%',
       marginBottom: '1.8%',
       borderRadius: 15,
       justifyContent: 'center',
       alignItems: 'center',
     },

     categoryBoxTxt: {
       fontSize: RFPercentage(2.5),
       fontFamily: 'Raleway-Medium',
       color: 'white',
     },

     categoryBoxBtn: {
        backgroundColor: '#f0c96d',
        borderWidth: 1.2,
     },

     categoryBoxTxtEffect: {
        color: 'black'
     },

     subTaskContainer: {
       height: subTaskContainerHeight,
       width: subTaskContainerWidth,
       borderColor: 'blue',
       borderWidth: 2,
       borderStyle: 'solid',
       alignItems: 'center'
     },

     subTaskHeader: {
       flexDirection: 'row',
       borderColor: 'gray',
       borderWidth: 2,
       borderStyle: 'solid',
     },

     subTaskHeaderTxt: {
       fontSize: RFPercentage(3),
       color: 'white',
       borderColor: 'blue',
       borderWidth: 2,
       borderStyle: 'solid',
     },

     subTask: {
       flexDirection: 'row',
       height: subTaskContainerHeight * 0.3,
       width: subTaskContainerWidth * 0.95,
       borderColor: 'red',
       borderWidth: 2,
       borderStyle: 'solid',  
       alignItems: 'center'
     },

     subTaskTxt: {
      color: 'white'

     }



});


export const containerStylesSettings = {
       borderWidth: 0.5,
       borderColor: '#ccc',
       borderRadius: 8,
       height: 60,
       alignSelf: 'center' as const
}; 

export const descriptionContainerStylesSettings = {
       borderWidth: 0.5,
       borderColor: '#ccc',
       borderRadius: 8,
       height: 140, 
       alignSelf: 'center' as const
}; 


export const customLabelStylesSettings1 = {
      colorFocused: '#fff', // font color of the label
      colorBlurred: '#fff',
      fontSizeFocused: RFPercentage(2.7), // fontsize of the label when it is floating
      fontSizeBlurred: RFPercentage(3), // fontsize of the label when it is inside the input
      fontFamilyFocused: 'Raleway-Regular',
      fontFamilyBlurred: 'Raleway-Regular',
      topBlurred: -15,
      topFocused: -32,
      leftFocused: 10,
};

export const customLabelStylesSettings2 = {
      colorFocused: '#fff', // font color of the label
      colorBlurred: '#fff',
      fontSizeFocused: RFPercentage(2.7), // fontsize of the label when it is floating
      fontSizeBlurred: RFPercentage(3), // fontsize of the label when it is inside the input
      fontFamilyFocused: 'Raleway-Regular',
      fontFamilyBlurred: 'Raleway-Regular',
      topBlurred: -55,
      topFocused: -70,
      leftFocused: 10,
};

export const labelStylesSettings = {
       backgroundColor: '#212832',
       paddingHorizontal: 4,
};

export const inputStylesSettings = {
        fontSize: RFPercentage(2.3), // fontsize of the input text
        paddingLeft: 15,
        paddingRight: 15, 
        fontFamily: 'Raleway-Regular',
        color: 'white', // color of the input text
};

