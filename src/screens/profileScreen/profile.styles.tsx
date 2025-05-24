import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window'); 

const headerContainerHeight_1 = height * 0.08; 
const headerContainerWidth_1 = width * 1; 

const headerContainerHeight_2 = height * 0.08;
const headerContainerWidth_2 = width * 1; 

const carouselContainerHeight = height * 0.25;
const carouselContainerWidth = width * 1;

const mainContainerHeight = height * 0.45;
const mainContainerWidth = width * 1;

const searchBarContainerHeight = height * 0.11;
const searchBarContainerWidth = width * 1;


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
          // borderColor: 'red',
          // borderWidth: 2,
          // borderStyle: 'solid',
      }, 

      userSettingsBtn: {
         padding: '1%',
         position: 'absolute',
         left: headerContainerWidth_1*0.85,
        //  borderColor: 'black',
        //  borderWidth: 0.2,
        //  borderStyle: 'solid',
         borderRadius: headerContainerWidth_1 * 0.5,
      }, 


      headerContainer2: {
          height: headerContainerHeight_2,
          width: headerContainerWidth_2,
          justifyContent: 'center',
          paddingLeft: '6%',
          // borderWidth: 1,
          // borderColor: 'black',
          // borderStyle: 'solid'
      },


      searchBar: {
        position: 'absolute', 
        height: searchBarContainerHeight * 0.6,
        width: searchBarContainerWidth * 0.5,  
        left: '45%',
        justifyContent: 'center', 
        // borderColor: 'blue',
        // borderWidth: 2,
        // borderStyle: 'solid',
        // borderRadius: 16,
        // backgroundColor: 'rgba(0,0,0,0.1)'   
      },

      searchBarTxt: {
        fontSize: RFPercentage(2.5),
        paddingLeft: '52%',
      },

      searchBtn: {
        position: 'absolute',
        // borderColor: 'blue',
        // borderWidth: 2,
        // borderStyle: 'solid',
        top: '25%',
        left: '85%',   
      },

      dateHeaderTxt: {
        marginTop: '-1.5%',
        fontSize: RFPercentage(2),
        fontFamily: 'Poppins-Light',
        // borderColor: 'red',
        // borderWidth: 2,
        // borderStyle: 'solid',
      },

      introHeaderTxt1: {
         fontSize: RFPercentage(3),
         fontFamily: 'Poppins-Bold'
      }, 

      carouselContainer: {
          height: carouselContainerHeight,
          width: carouselContainerWidth,
          // borderColor: 'blue',
          // borderWidth: 2,
          // borderStyle: 'solid',
          position: 'relative',
      },

      carouseHeader: {
         position: 'absolute',
         fontSize: RFPercentage(3),
         fontFamily: 'Poppins-Medium',
         marginLeft: 18,
        //  borderColor: 'blue',
        //  borderWidth: 2,
        //  borderStyle: 'solid',
         top: '11%',
      },

      carouselBody: {
          position: 'absolute',
          // borderColor: 'red',
          // borderWidth: 2,
          // borderStyle: 'solid',   
          top: '30%',
          
      }, 
      




      featureContainer: {
         width: carouselContainerWidth * 0.5,
         height: carouselContainerHeight * 0.56,
         justifyContent: 'center',
         alignItems: 'center',
        //  borderColor: 'red',
        //  borderWidth: 2,
        //  borderStyle: 'solid',
         backgroundColor: '#b3eaff',
         borderRadius: 20,
         marginLeft: 18,
         
      }, 

      featureBtn: {
         justifyContent: 'center',
         alignItems: 'center',
        //  borderColor: 'red',
        //  borderWidth: 2,
        //  borderStyle: 'solid',     
      },

      featureTitle:{
        fontSize: RFPercentage(2.8),
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginLeft: '4%',
      },

      featureHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },

      featureDesc: {
         marginTop: '3%',
         fontSize: RFPercentage(2),
         fontFamily: 'Poppins-Regular',
         color: '#4a4a4a',
         textAlign: 'center',
      },

      mainContainer: {        
          height: mainContainerHeight,
          width: mainContainerWidth,
          // borderColor: 'red',
          // borderWidth: 2,
          // borderStyle: 'solid',
      }, 

      mainHeaderContainer: {
          position: 'relative',
          height: mainContainerHeight * 0.2,
          width: mainContainerWidth,
          flexDirection: 'row',
          // borderColor: 'red',
          // borderWidth: 2,
          // borderStyle: 'solid',
          alignItems: 'center',      
      },

      mainHeaderTxt: {
        position: 'absolute',
        marginLeft: '5%',
        fontSize: RFPercentage(3.2),
        fontFamily: 'Poppins-Regular',
      },

      TestContainer: {
        height: searchBarContainerHeight,
        width: searchBarContainerWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        borderStyle: 'solid',         
      },
       
      

});

export const shadowSettings = {
  distance: 7,
  offset: [19, 7] as [number, number],
  startColor: '#00000020',
  radius: 15,
  containerViewStyle: {
    width: carouselContainerWidth * 0.5,
    height: carouselContainerHeight * 0.7, 
  },
};