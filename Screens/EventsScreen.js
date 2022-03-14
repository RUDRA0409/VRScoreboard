import React from 'react';
import {
  Text,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  FlatList,
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

import { AntDesign } from '@expo/vector-icons';
export default class ScheduleEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userId: firebase.auth().currentUser.email,
      events: [],
      eventname: '',
      description: '',
      time: '',
      date: '',
      allEvents: [],
    };
  }
  getElections = async () => {
    await db
      .collection('Events')
      .where('schoolId', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allEvents = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          var event = doc.data();
          event['docId'] = doc.id;

          allEvents.push(event);
        });

        this.setState({ allEvents: allEvents });
      });
  };

  componentDidMount = () => {
    this.getElections();
  };

  addEventinDb = async () => {
    try{
    await db
      .collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data().isTeamsAdded);
          var isTeamsAdded = doc.data().isTeamsAdded;
          if (isTeamsAdded == true) {
            var event = {
              eventname: this.state.eventname,
              decription: this.state.description,
            };

            db.collection('Events').add({
              schoolId: this.state.userId,
              eventname: this.state.eventname,
              decription: this.state.description,
              date: this.state.date,
              time: this.state.time,
              scoreUpdated: false
            });
          } else {
            alert('First Add Teams Information and then create Events');
            this.props.navigation.navigate('AddTeamDetails');
          }
        });
      });
    }catch(e){
      console.log(e)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#5d34a5', '#482980']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Schedule Events</Text>
        </LinearGradient>

        <FlatList
          data={this.state.allEvents}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('EventsDetails', {
                  eventDetails: item,
                });
              }}
              style={{
                height: 100,
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#98BAE7', '#7267CB']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  width: '100%',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{ color: '#fff' }}>{item.eventname}</Text>
                  <Text style={{ color: '#fff' }}>{item.decription}</Text>
                  <Text style={{ color: '#fff' }}>{item.time}</Text>
                  <Text style={{ color: '#fff' }}>{item.date}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View>
          <Modal
            style={styles.modalView}
            isVisible={this.state.modalVisible}
            backdropOpacity={0.4}
            onBackdropPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalMainView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -13,
                  right: -10,
                  margin: 10,
                  padding: 10,
                }}
                onPress={() => this.setState({ modalVisible: false })}>
                <MaterialIcons name="cancel" size={24} color="#4632A1" />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                Fill Event Details
              </Text>
              <TextInput
                placeholder="Enter Event Name"
                onChangeText={(val) => {
                  this.setState({
                    eventname: val,
                  });
                }}
                style={{
                  padding: 10,
                  margin: 10,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                value={this.state.eventname}
              />
              <TextInput
                placeholder="Date"
                onChangeText={(val) => {
                  this.setState({
                    date: val,
                  });
                }}
                multiline={true}
                style={{
                  padding: 10,
                  margin: 10,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 50,
                  width: '90%',
                }}
                value={this.state.color}
              />
              <TextInput
                placeholder="Time"
                onChangeText={(val) => {
                  this.setState({
                    time: val,
                  });
                }}
                style={{
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                  borderWidth: 3,
                  borderColor: 'gray',
                }}
              />
              <TextInput
                placeholder="Add Event Description"
                onChangeText={(val) => {
                  this.setState({
                    description: val,
                  });
                }}
                multiline={true}
                style={{
                  padding: 10,
                  margin: 10,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 50,
                  width: '90%',
                }}
                value={this.state.color}
              />
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#4632A1',
                  borderRadius: 10,
                }}
                onPress={() => {
                  //add details in db
                  this.setState({ modalVisible: false });
                  this.addEventinDb();
                }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 30 }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text style={{ marginRight: 200, fontSize: 30, color: '#4632A1' }}>
          Back
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
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
      width: 8,
      height: 30,
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
  fab: {
    marginTop: 120,
    marginLeft: 290,
    width: 60,
    height: 60,
    right: 30,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4632A1',
    borderRadius: 30,
  },
});
