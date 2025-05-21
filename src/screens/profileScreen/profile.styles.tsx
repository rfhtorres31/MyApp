import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window'); 

const headerContainerHeight_1 = height * 0.10; 
const headerContainerWidth_1 = width * 1; 

const headerContainerHeight_2 = height * 0.10;
const headerContainerWidth_2 = width * 1; 

const carouselContainerHeight = height * 0.25;
const carouselContainerWidth = width * 1;

const mainContainerHeight = height * 0.47;
const mainContainerWidth = width * 1;

const menuContainerHeight = height * 0.08;
const menuContainerWidth = width * 1;

export const profileStyles = StyleSheet.create ({

      profileContainer: {
          flex: 1,
          backgroundColor: 'white',
      }, 

      headerContainer1: {
          position: 'relative',
          height: headerContainerHeight_1,
          width: headerContainerWidth_1, 
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        //   borderColor: 'red',
        //   borderWidth: 2,
        //   borderStyle: 'solid',
      }, 

      notifBtn: {
         padding: '1%',
         position: 'absolute',
         left: headerContainerWidth_1*0.85,
         borderColor: 'black',
         borderWidth: 0.5,
         borderStyle: 'solid',
         borderRadius: headerContainerWidth_1 * 0.5,
      }, 

      dateHeaderTxt: {
        fontSize: RFPercentage(2.7),
        fontFamily: 'Poppins-Light',
        // borderColor: 'red',
        // borderWidth: 2,
        // borderStyle: 'solid',
      },

      headerContainer2: {
          height: headerContainerHeight_2,
          width: headerContainerWidth_2,
          justifyContent: 'center',
          paddingLeft: '4%',
          // borderWidth: 1,
          // borderColor: 'black',
          // borderStyle: 'solid'
      },  

      introHeaderTxt: {
         fontSize: RFPercentage(2.8),
         fontFamily: 'Poppins-Medium'
      }, 

      carouselContainer: {
          height: carouselContainerHeight,
          width: carouselContainerWidth,
          // borderColor: 'red',
          // borderWidth: 2,
          // borderStyle: 'solid',


      }, 
      
      featureContainer: {
         width: carouselContainerWidth * 0.5,
         height: carouselContainerHeight*0.7,
         justifyContent: 'center',
         alignItems: 'center',
        //  borderColor: 'red',
        //  borderWidth: 2,
        //  borderStyle: 'solid',
         backgroundColor: 'white',
         borderRadius: 20,
         marginLeft: 10,
      }, 
      

      mainContainer: {
          height: mainContainerHeight,
          width: mainContainerWidth,
        //   borderColor: 'red',
        //   borderWidth: 2,
        //   borderStyle: 'solid',
      }, 
       
      menuContainer: {
          height: menuContainerHeight,
          width: menuContainerWidth,
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      }, 
      




});

