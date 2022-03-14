import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/Login';
import SignUpScreen from './Screens/SignUp';
import AddTeamDetails from './Screens/AddTeamDetails';
import LoadingScreen from './Screens/LoadingScreen';
import ForgotPassword from './Screens/forgotPassword';
import BottomTabNavigator from './Navigate/bottomTabNav';
import EventsScreen from './Screens/EventsScreen'
import EventsDetails from './Screens/EventsDetails'
import SettingsScreen from './Screens/SettingsScreen'
import UpdateProfileScreen from './Screens/UpdateProfileScreen'
const Stack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" headerMode="none">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="EventsDetails" component={EventsDetails} />
        <Stack.Screen name="AddTeamDetails" component={AddTeamDetails} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
      </Stack.Navigator>


    </NavigationContainer>
  );

};
export default App;
