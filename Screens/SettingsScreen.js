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
  Alert,
} from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';

import firebase from 'firebase';
export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      schoolName: '',
      mobileNumber: '',
      address: '',
      image: '../assets/Login_ScreenBackground.png',
      docId: '',
    };
  }
  getUser = async () => {
    await db
      .collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var user = doc.data();

          this.setState({
            schoolName: doc.data().schoolName,
            mobileNumber: doc.data().contact,
            address: doc.data().address,
            docId: doc.id,
          });
        });
      });
  };

  update() {
    db.collection('users')
      .doc(this.state.docId)
      .update({
        schoolName: this.state.schoolName,
        contact: this.state.mobileNumber,
        address: this.state.address,
       
      });
      alert("Updated successfully");

  }
  componentDidMount = () => {
    this.getUser();
  };
  render() {
    return (
      
      <SafeAreaProvider
        style={{ flex: 1, backgroundColor: 'white' }}>
         <LinearGradient
          colors={['#5d34a5', '#482980']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Settings Screen</Text>
        </LinearGradient>
        <LinearGradient
          // Button Linear Gradient
          colors={['#5d34a5', '#482980', '#000']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 40,
            }}
            source={require('../assets/Login_ScreenBackground.png')}
          />
          <Text style={{ marginTop: 5, color: 'white' }}>
            {this.state.email}
          </Text>
        </LinearGradient>
        <TextInput
        onChangeText={(text) => {
          this.setState({
            schoolName: text,
          });
        }}
          style={{
            width:"60%",
            fontSize: 17,
            fontWeight: 'bold',
            marginTop:5,
            color: 'white',
            textAlign:'center',
            backgroundColor: '#5d34a5',
            marginLeft:10,
            alignSelf:"center"
          }}
          placeholder="School Name"
          placeholderTextColor="gray"
          value={this.state.schoolName}
        />
        <TextInput
         onChangeText={(text) => {
          this.setState({
            address: text,
          });
        }}
          style={{
            width:"60%",
            fontSize: 17,
            fontWeight: 'bold',
            color: 'white',
            textAlign:'center',   
            backgroundColor: '#5d34a5',
            marginLeft:10,
            alignSelf:"center"

          }}
          
          placeholder="Address"
          placeholderTextColor="gray"
          value={this.state.address}
        />
        <TextInput
         onChangeText={(text) => {
          this.setState({
            mobileNumber: text,
          });
        }}
          style={{
            width:"60%",
            fontSize: 17,
            fontWeight: 'bold',
            color: 'white',
            textAlign:'center',      
            backgroundColor: '#5d34a5',
            marginLeft:10,
            alignSelf:"center"

          }}
          placeholder="Mobile Number"
          placeholderTextColor="gray"
          value={this.state.mobileNumber}
        />
        <View style = {{marginLeft:80,marginTop:115,}}>
        <TouchableOpacity
          style={{
            width: '70%',
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor:'#4632A1',
            padding: 15,
          }}
          onPress={() => {
            this.update();
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Update Profile
          </Text>
        </TouchableOpacity>

           <TouchableOpacity
          style={{
            width: '70%',
            marginTop:40,
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor:'#4632A1',
            padding: 15,
          }}
          onPress={() => {
           firebase.auth().signOut()
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaProvider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    headingText: {
      marginLeft:120,
      marginTop:20,
      height:50,
    fontSize: 16,
    color: 'white',
  },
});
