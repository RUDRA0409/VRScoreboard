import * as React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EventsScreen from '../Screens/EventsScreen';
import EventsDetails from '../Screens/EventsDetails';
import HomeScreen from '../Screens/HomeScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import UpdateProfileScreen from '../Screens/UpdateProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import forgotPassword from '../Screens/forgotPassword'

const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={25}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={'#ffffff'}
      inactiveColor={'#ffffff'}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventStackNav} />
      <Tab.Screen name="Settings" component={SettingsStackNav} />
    </Tab.Navigator>
  );
};


const EventStack = createStackNavigator();  

export const EventStackNav=()=> {
  return (
    <EventStack.Navigator initialRouteName="EventsScreen"  screenOptions={{headerShown:false}}>
      <EventStack.Screen name="EventsScreen" component={EventsScreen} />
      <EventStack.Screen name="EventsDetails" component={EventsDetails} />
    </EventStack.Navigator>
  );
} 

const SettingsStack = createStackNavigator();  

export const SettingsStackNav=()=> {
  return (
    <SettingsStack.Navigator initialRouteName="SettingsScreen" screenOptions={{headerShown:false}}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </SettingsStack.Navigator>
  );
} 

export default BottomTabNavigator;
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#5d34a5',
    height: '8%',
    overflow: 'hidden',
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icons: {
    width: 30,
    height: 30,
  },
});