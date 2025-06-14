import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get('window');


//Setting the dimension of each containers
const modalWidth = width * 1;
const modalHeight = height * 0.75;

const searchModalstyle = StyleSheet.create({

      overlay: {
         flex: 1,
         position: 'relative',
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },

      modalContainer: {
        position: 'absolute',
        width: modalWidth,
        height: modalHeight,
        backgroundColor: 'white',     
      }, 


});



export default searchModalstyle;