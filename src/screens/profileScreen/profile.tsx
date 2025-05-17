import React from 'react';
import { ScrollView, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import profileStyles from './profile.styles';
import { getDayName, getMonthName } from '../../utils/dateUtils';


export const ProfileScreen = () => {
    
    const dateNow = new Date();

    const day = getDayName(dateNow.getDay());
    const month = getMonthName(dateNow.getMonth()); // in javascript .getMonth() function is a zero based, meaning, January starts at index = 0
    const date = dateNow.getDate();
    const dateHeader = `${day}, ${month} ${date}`;

    console.log(dateHeader);
    
    return (
        <SafeAreaView style={profileStyles.profileContainer}>
           <View style={profileStyles.headerContainer1}>
              <Text style={profileStyles.dateHeaderTxt}>{dateHeader}</Text>
           </View>
           <View style={profileStyles.headerContainer2}>
              <Text style={profileStyles.introHeaderTxt}>Let's make it productive, "Name of the user"</Text>
              <Text style={profileStyles.introHeaderTxt}>What do you want to do?</Text>
           </View>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={profileStyles.carouselContainer} contentContainerStyle={{flexDirection:'row'}}>
                  <View style={profileStyles.feature}>
              
                  </View>
                  <View style={profileStyles.feature}>
              
                  </View>
                  <View style={profileStyles.feature}>
              
                  </View>
                  <View style={profileStyles.feature}>
              
                  </View>
           </ScrollView>
           <View style={profileStyles.mainContainer}>
              <Text>Test4</Text>
           </View>
           <View style={profileStyles.menuContainer}>
              <Text>Test5</Text>
           </View>
        </SafeAreaView>
    );


};
