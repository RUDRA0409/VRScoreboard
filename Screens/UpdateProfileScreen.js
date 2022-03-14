import React from 'react';
import {
  Text,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default class UpdateProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <View style={styles.container}>
          <LinearGradient
          colors={['#5d34a5', '#482980']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Home</Text>
        </LinearGradient>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    heading: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  
});
