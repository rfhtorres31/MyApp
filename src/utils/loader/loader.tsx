import { ActivityIndicator, View, Modal } from "react-native";
import loaderStyles from './loader.styles';


type loaderProps = {
   visible: boolean,
};

const Loader = ({visible}:loaderProps) => {


   return (
       <Modal transparent={true} visible={visible} animationType="fade">
         <View style={loaderStyles.mainContainer}>
            <ActivityIndicator size={100} color="#ffffff"/>
         </View>
       </Modal>
   );

};



export default Loader;