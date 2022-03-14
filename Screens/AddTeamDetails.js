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
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-elements';

import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

import Modal from 'react-native-modal';
import { Avatar, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import {Picker} from '@react-native-picker/picker'
import { AntDesign } from '@expo/vector-icons';
export default class AddTeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userId: firebase.auth().currentUser.email,
      teams: [],
      team1Name: '',
      team2Name: '',
      team3Name: '',
      team4Name: '',
      team1Color: '',
      team2Color: '',
      team3Color: '',
      team4Color: '',
      docId: '',
    };
  }

  componentDidMount=async()=> {
    await db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({ docId: doc.id });
        });
      });
  }
  hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  submitTeams() {
    if (
      this.state.team1Name.length !== 0 &&
      this.state.team2Name.length !== 0 &&
      this.state.team3Name.length !== 0 &&
      this.state.team4Name.length !== 0
    ) {
      var teams = [
        this.state.team1Name.toLowerCase(),
        this.state.team2Name.toLowerCase(),
        this.state.team3Name.toLowerCase(),
        this.state.team4Name.toLowerCase(),
      ];
      console.log(teams + this.hasDuplicates(teams));

      if (this.hasDuplicates(teams) === true) {
        alert('Team names cant be same');
      } else {
        var teamColors = [
          this.state.team1Color.toLowerCase(),
          this.state.team2Color.toLowerCase(),
          this.state.team3Color.toLowerCase(),
          this.state.team4Color.toLowerCase(),
        ];
        if (this.hasDuplicates(teamColors)) {
          alert('Team Colors cant be same');
        } else {
          db.collection('Teams').doc(this.state.userId).set({
            schoolId: this.state.userId,
            team1: {
              name: this.state.team1Name,
              color: this.state.team1Color,
              points: 0,
            },
            team2: {
              name: this.state.team2Name,
              color: this.state.team2Color,
              points: 0,
            },
            team3: {
              name: this.state.team3Name,
              color: this.state.team3Color,
              points: 0,
            },
            team4: {
              name: this.state.team4Name,
              color: this.state.team4Color,
              points: 0,
            },
            teams: [
              this.state.team1Name,
              this.state.team2Name,
              this.state.team3Name,
              this.state.team4Name,
            ],
          });

          db.collection("users").doc(this.state.docId).update({isTeamsAdded: true})
          this.props.navigation.navigate('Home');

        }
      }
    } else {
      alert('Enter all Team details properly');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#5d34a5', '#482980']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Add Teams</Text>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              padding: 15,
              backgroundColor: 'rgba(112,86,205,0.8)',
              alignSelf: 'center',
            }}>
            <ScrollView>
              <KeyboardAvoidingView>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  Enter Teams below:
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    marginTop: 20,
                    padding: 5,
                    textAlign: 'left',
                  }}>
                  Team one:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#fffa"
                    onChangeText={(text) => {
                      this.setState({
                        team1Name: text,
                      });
                    }}
                    style={styles.input}
                    value={this.state.team1Name}
                  />
                  <Picker
                    selectedValue={this.state.team1Color}
                    style={{
                      width: '40%',
                      height: 40, //Define Picker component with state
                      marginTop: 10,
                      borderWidth: 1,
                      borderRadius: 4,
                      color: 'black',
                      backgroundColor: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        team1Color: itemValue,
                      })
                    }>
                    <Picker.Item label="Color" value="" />
                    <Picker.Item label="Green" value="Green" />
                    <Picker.Item label="Blue" value="Blue" />
                    <Picker.Item label="Yellow" value="Yellow" />
                    <Picker.Item label="Red" value="Red" />
                  </Picker>
                </View>   
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    marginTop: 20,
                    padding: 5,
                    textAlign: 'left',
                  }}>
                  Team two:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#fffa"
                    onChangeText={(text) => {
                      this.setState({
                        team2Name: text,
                      });
                    }}
                    style={styles.input}
                    value={this.state.team2Name}
                  />
                  <Picker
                    selectedValue={this.state.team2Color}
                    style={{
                      width: '40%',
                      height: 40, //Define Picker component with state
                      marginTop: 10,
                      borderColor: 'white',
                      borderWidth: 1,
                      borderRadius: 4,
                      fontColor: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        team2Color: itemValue,
                      })
                    }>
                    <Picker.Item label="Color" value="" />
                    <Picker.Item label="Green" value="Green" />
                    <Picker.Item label="Blue" value="Blue" />
                    <Picker.Item label="Yellow" value="Yellow" />
                    <Picker.Item label="Red" value="Red" />
                  </Picker>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    marginTop: 20,
                    padding: 5,
                    textAlign: 'left',
                  }}>
                  Team three:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#fffa"
                    onChangeText={(text) => {
                      this.setState({
                        team3Name: text,
                      });
                    }}
                    style={styles.input}
                    value={this.state.team3Name}
                  />
                  <Picker
                    selectedValue={this.state.team3Color}
                    style={{
                      width: '40%',
                      height: 40, //Define Picker component with state
                      marginTop: 10,
                      borderColor: 'white',
                      borderWidth: 1,
                      borderRadius: 4,
                      fontColor: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        team3Color: itemValue,
                      })
                    }>
                    <Picker.Item label="Color" value="" />
                    <Picker.Item label="Green" value="Green" />
                    <Picker.Item label="Blue" value="Blue" />
                    <Picker.Item label="Yellow" value="Yellow" />
                    <Picker.Item label="Red" value="Red" />
                  </Picker>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    marginTop: 20,
                    padding: 5,
                    textAlign: 'left',
                  }}>
                  Team four:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#fffa"
                    onChangeText={(text) => {
                      this.setState({
                        team4Name: text,
                      });
                    }}
                    style={styles.input}
                    value={this.state.team4Name}
                  />
                  <Picker
                    
                    selectedValue={this.state.team4Color}
                    style={{
                      width: '40%',
                      height: 40, //Define Picker component with state
                      marginTop: 10,
                      borderColor: 'white',
                      borderWidth: 1,
                      borderRadius: 4,
                      fontColor: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        team4Color: itemValue,
                      })
                    }>
                    <Picker.Item label="Color" value="" />
                    <Picker.Item label="Green" value="Green" />
                    <Picker.Item label="Blue" value="Blue" />
                    <Picker.Item label="Yellow" value="Yellow" />
                    <Picker.Item label="Red" value="Red" />
                  </Picker>

                </View>

                <LinearGradient
                  colors={['#5902EC', '#5902EC']}
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
                      this.submitTeams();
                    }}>
                    <Text style={styles.btnTxt}>Submit</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
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
  input: {
    padding: 5,
    width: '60%',
  },
});
