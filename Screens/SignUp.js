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
import db from '../config';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      email: 'a@t.com',
      password: 'qwertyui',
      showPassword: false,
      confirmPassword: '',
      showConfirmPassword: false,
    };
  }
  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert('Welcome To the App You Have Succesfully Signed Up');

        db.collection('users').add({
          email: this.state.email,
          schoolName: this.state.schoolName,
          isTeamsAdded: false,
          contact: "",
          address: "",
        });

        this.props.navigation.navigate('AddTeamDetails');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
checkPassword = ()=>{
if(this.state.password === this.state.confirmPassword){
alert('Welcome')
}else{
  alert('Passwords do not match')

}
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

        <View style={styles.footer}>
          <ScrollView>
            <KeyboardAvoidingView>
              <View style={{ justifyContent: 'space-evenly' }}>
                <Text
                  style={{
                    color: '#4632A1',
                    fontWeight: 'Bold',
                    fontSize: 20,
                  }}>
                  Get Started
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <Text style={{ marginTop: 5 }}>
                    Already have account?
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>
                      Login here
                    </Text>
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  School Name
                </Text>
                <View style={{ borderBottomWidth: 0.5, borderColor: 'gray' }}>
                  <TextInput
                    placeholder="School Name"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      this.setState({
                        schoolName: text,
                      });
                    }}
                    style={styles.input}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  Email Address
                </Text>
                <View style={{ borderBottomWidth: 0.5, borderColor: 'gray' }}>
                  <TextInput
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      this.setState({
                        email: text,
                      });
                    }}
                    style={styles.input}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  Password
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    secureTextEntry={
                      this.state.showPassword === false ? true : false
                    }
                    placeholder="* * * * * * * *"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <Ionicons
                    name={
                      this.state.showPassword
                        ? 'ios-eye-sharp'
                        : 'ios-eye-off-sharp'
                    }
                    size={24}
                    color="black"
                    onPress={() => {
                      if (this.state.showPassword === false) {
                        this.setState({ showPassword: true });
                      } else if (this.state.showPassword === true) {
                        this.setState({ showPassword: false });
                      }
                    }}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 20,
                    padding: 5,
                  }}>
                  Confirm Password
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    secureTextEntry={
                      this.state.showConfirmPassword === false ? true : false
                    }
                    placeholder="* * * * * * * *"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <Ionicons
                    name={
                      this.state.showConfirmPassword
                        ? 'ios-eye-sharp'
                        : 'ios-eye-off-sharp'
                    }
                    size={24}
                    color="black"
                    onPress={() => {
                      if (this.state.showConfirmPassword === false) {
                        this.setState({ showConfirmPassword: true });
                      } else if (this.state.showConfirmPassword === true) {
                        this.setState({ showConfirmPassword: false });
                      }
                    }}
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
                    }}
                    onPress={() => {
                      this.signUp();
                    }}>
                    <Text style={styles.btnTxt}>Register</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 5,
    backgroundColor: '#fff',
    width: '85%',
  },

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
