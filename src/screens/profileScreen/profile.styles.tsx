import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window'); 

const headerContainerHeight_1 = height * 0.10; 
const headerContainerWidth_1 = width * 1; 

const headerContainerHeight_2 = height * 0.15;
const headerContainerWidth_2 = width * 1; 

const carouselContainerHeight = height * 0.2;
const carouselContainerWidth = width * 1;

const mainContainerHeight = height * 0.4;
const mainContainerWidth = width * 1;

const menuContainerHeight = height * 0.15;
const menuContainerWidth = width * 1;

const profileStyles = StyleSheet.create ({

      profileContainer: {
          flex: 1,
          backgroundColor: 'white',
      }, 

      headerContainer1: {
          height: headerContainerHeight_1,
          width: headerContainerWidth_1, 
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      }, 

      dateHeaderTxt: {
        fontSize: RFPercentage(3),
      },

      headerContainer2: {
          height: headerContainerHeight_2,
          width: headerContainerWidth_2,
          justifyContent: 'center',
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      },  

      introHeaderTxt: {
         fontSize: RFPercentage(2.5),
      }, 

      carouselContainer: {
          height: carouselContainerHeight,
          width: carouselContainerWidth,
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      }, 
      
      feature: {
         width: carouselContainerWidth * 0.5,
         height: carouselContainerHeight,
         borderColor: 'blue',
         borderWidth: 2,
         borderStyle: 'solid',
         marginRight: 15,
      }, 


       mainContainer: {
          height: mainContainerHeight,
          width: mainContainerWidth,
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      }, 
       
      menuContainer: {
          height: menuContainerHeight,
          width: menuContainerWidth,
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid',
      }, 
      




});


export default profileStyles;