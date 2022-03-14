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
import { Icon } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';

export default class forgotPassword extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
      
        <ImageBackground
          style={styles.header}
          resizeMode="cover"
          source={require('../assets/bg.png')}>
          <View style={styles.overlay}>
            <View style={styles.brandView}>
              <Image
                source={require('../assets/logo1.png')}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.brandViewText}> VRScoreboard</Text>
            </View>
          </View>
        </ImageBackground>
            <View style = {styles.footer}>
            <View style={{justifyContent: 'space-evenly',marginBottom:120,}}>
              
                <Text
                  style={{
                    color: '#4632A1',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Welcome
                </Text>
                 <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <Text style={{ marginTop: 5 }}>
                   Remember Your Password?
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>
                    Login Now
                    </Text>
                  </Text>
                </TouchableOpacity>

                </View>
                <View style = {{marginBottom: 30,}}>
                 <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  Email Address
                </Text>
                  <View style = {{borderBottomWidth: 0.2, borderColor: 'gray',}}>
        <TextInput
          placeholder="Enter Registered Email ID"
          onChangeText={(val) => {
            this.setState({ email: val });
          }}
          style = {styles.input}
        />
        </View>
        <LinearGradient
                  colors={['#5d34a5', '#482980']}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.button, { marginBottom: 50, marginTop: 30 }]}>
                     <TouchableOpacity
          style={{
                      width: '60%',
                      height: 50,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#4632A1',
                    }}
          
          onPress={() => {
            firebase
              .auth()
              .sendPasswordResetEmail(this.state.email)
              .then(() => {
                alert('Password Reset Link Sent');
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
              });
          }}

          >
          <Text style = {styles.btnTxt}>Send Password Reset Link</Text>
          </TouchableOpacity>
          </LinearGradient>
          </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },

  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
 header: {
    flex: 0.4,
    height:100,
    overflow: 'hidden',
  },
  footer: {
    flex: 0.6,
    backgroundColor: 'white',
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  input: {
     fontSize:14,
    marginTop:5,
    marginLeft:60,
    padding: 5,
    width: '85%',
    
    
  },
  brandView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(112,86,205,0.8)',
  },
});
