import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


const {width, height} = Dimensions.get('window');

const headerContainerHeight = height * 0.1;
const headerContainerWidth = width * 1;

const bodyHeight = height * 0.9;
const bodyWidth = width * 1;

const categoryFieldContainerHeight = bodyHeight * 0.25;
const categoryFieldContainerWidth = bodyWidth * 1;

const startDateFieldContainerHeight = bodyHeight * 0.15;
const startDateFieldContainerWidth = bodyWidth * 1;


export const simpleTaskScreenStyles = StyleSheet.create({


     taskContainer: {
           flex: 1,    
           backgroundColor: 'white',  
     }, 

     headerContainer: {
       position: 'relative',
       height: headerContainerHeight,
       width: headerContainerWidth,
    //    borderColor: 'red',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
     },

     backBtn: {
       position: 'absolute',
       left: '2%',
    //    borderColor: 'red',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
     }, 

     headerTxt: {
       position: 'absolute', 
    //    borderColor: 'red',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
       fontSize: RFPercentage(3.3),
       fontFamily: 'Raleway-Regular',
     }, 

     bodyContainer: {
       height: bodyHeight,
       width: bodyWidth,
      //  borderColor: 'blue',
      //  borderWidth: 2,
      //  borderStyle: 'solid',
     alignItems: 'center',
     },

     label: {
       fontSize: 18,
     },

     inputField: {
       height: bodyHeight * 0.15,
       width: bodyWidth * 0.95,
    //    borderColor: 'orange',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
     },

     descriptionField: {
       height: bodyHeight * 0.17,
       width: bodyWidth * 0.95,
    //    borderColor: 'orange',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
     },

     description: {
       height: bodyHeight * 0.15,
       width: bodyWidth,
    //    borderColor: 'orange',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
     }, 

     categoryFieldContainer: {
       height: categoryFieldContainerHeight,
       width: categoryFieldContainerWidth,
      //  borderColor: 'orange',
      //  borderWidth: 2,
      //  borderStyle: 'solid',
     },

     categoryHeader: {
       height: categoryFieldContainerHeight * 0.2,
       width: categoryFieldContainerWidth,
       fontSize: RFPercentage(3),
       fontFamily: 'Raleway-Medium',
       marginLeft: '4.6%',
    //    borderColor: 'orange',
    //    borderWidth: 2,
    //    borderStyle: 'solid',
     },

     categoryBody: {
       height: categoryFieldContainerHeight * 0.8,
       width: categoryFieldContainerWidth,
      //  borderColor: 'blue',
      //  borderWidth: 2,
      //  borderStyle: 'solid',
       flexDirection: 'row',
       flexWrap: 'wrap',
       paddingTop: '2%',
     },

     categoryBox: {
       height: categoryFieldContainerHeight * 0.8 * 0.35,
       width: bodyWidth * 0.3,
       borderColor: '#4a4a4a',
       borderWidth: 0.5,
       borderStyle: 'solid',
       marginLeft: '2%',
       marginBottom: '1.8%',
       borderRadius: 10,
       justifyContent: 'center',
       alignItems: 'center',
     },

     categoryBoxTxt: {
       fontSize: RFPercentage(2.5),
       fontFamily: 'Raleway-Medium',
     },

     categoryBoxBtn: {
        borderColor: 'red',
        borderWidth: 1.2,
     }, 

     startDateFieldContainer: {
       width: startDateFieldContainerWidth,
       height: startDateFieldContainerHeight * 0.9, 
      //  borderColor: 'red',
      //  borderWidth: 1,
      //  borderStyle: 'solid',
       flexDirection: 'row',
       justifyContent: 'center',
     }, 

    //  endDateFieldContainer: {
    //    width: endDateFieldContainerWidth,
    //    height: endDateFieldContainerHeight, 
    //    borderColor: 'red',
    //    borderWidth: 1,
    //    borderStyle: 'solid',
    //  }, 

    startDate: {
      height: startDateFieldContainerHeight * 0.9,
      width: startDateFieldContainerWidth * 0.45,
      // borderColor: 'red',
      // borderWidth: 1,
      // borderStyle: 'solid',
    }, 

    dateTimeHeader: {
      textAlign: 'center',
      fontFamily: 'Raleway-Medium',
      fontSize: RFPercentage(3),
      marginBottom: '2%',
      // borderColor: 'red',
      // borderWidth: 1,
      // borderStyle: 'solid',
    }, 

    dateTimeContent: {
      flex: 1,
      borderColor: '#4a4a4a',
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },

    dateTimeContentTxt: {
      fontSize: RFPercentage(2.1),
      fontFamily: 'Raleway-Regular',
      textAlign: 'center',
    },
     
    endDate: {
     height: startDateFieldContainerHeight * 0.9,
     width: startDateFieldContainerWidth * 0.45,
    //  borderColor: 'red',
    //  borderWidth: 1,
    //  borderStyle: 'solid',
     marginLeft: '4%',
    }, 

    submitBtn: {
      height: bodyHeight * 0.07,
      width: bodyWidth * 0.4,
      // borderColor: 'red',
      // borderWidth: 1,
      // borderStyle: 'solid',
      marginTop: '5%',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2ec7e6'
    }, 

    



  



});


export const containerStylesSettings = {
       borderWidth: 1,
       borderColor: '#ccc',
       borderRadius: 8,
    //    paddingHorizontal: 10,
       height: 60,
       marginTop: 22,
}; 

export const descriptionContainerStylesSettings = {
       borderWidth: 1,
       borderColor: '#ccc',
       borderRadius: 8,
    //    paddingHorizontal: 10,
       height: 70,
       marginTop: 22,
}; 

export const customLabelStylesSettings = {
      colorFocused: '#000', // font color of the label
      colorBlurred: '#000',
      fontSizeFocused: RFPercentage(2.7), // fontsize of the label when it is floating
      fontSizeBlurred: RFPercentage(3), // fontsize of the label when it is inside the input
      fontFamilyFocused: 'Raleway-Regular',
      fontFamilyBlurred: 'Raleway-Regular',
      topFocused: 0,
      leftFocused: 10,
};

export const labelStylesSettings = {
       backgroundColor: 'white',
       paddingHorizontal: 4,
};

export const inputStylesSettings = {
        fontSize: RFPercentage(2.5), // fontsize of the input text
        marginTop: 7,
        paddingLeft: 15, 
        fontFamily: 'Raleway-Regular',
        color: 'black', // color of the input text
};