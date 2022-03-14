import React, { useState } from 'react';
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
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import { IoIosAlarm } from "react-icons/io";
import { IoMdBrowsers } from "react-icons/io";
import { IoCalendarOutline} from "react-icons/ai";
import { IoIosCalendar } from "react-icons/io";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class EventsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: this.props.route.params.eventDetails['eventname'],
      time: this.props.route.params.eventDetails['time'],
      decription: this.props.route.params.eventDetails['decription'],
      date: this.props.route.params.eventDetails['date'],
      eventId: this.props.route.params.eventDetails['docId'],
      userId: firebase.auth().currentUser.email,
      scoreUpdated: this.props.route.params.eventDetails['scoreUpdated'],

      team1Name: '',
      team2Name: '',
      team3Name: '',
      team4Name: '',

      team1Points: 0,
      team2Points: 0,
      team3Points: 0,
      team4Points: 0,

      team1Color: '',
      team2Color: '',
      team3Color: '',
      team4Color: '',
    };
    console.log(this.props.route.params.eventDetails);
  }

  submitPoints = () => {
    try {
      var team1 = {
        color: this.state.team1Color,
        name: this.state.team1Name,
        points: this.state.team1Points,
      };
      var team2 = {
        color: this.state.team2Color,
        name: this.state.team2Name,
        points: this.state.team2Points,
      };
      var team3 = {
        color: this.state.team3Color,
        name: this.state.team3Name,
        points: this.state.team3Points,
      };
      var team4 = {
        color: this.state.team4Color,
        name: this.state.team4Name,
        points: this.state.team4Points,
      };
      db.collection('Events').doc(this.state.eventId).update({
        team1: team1,
        team2: team2,
        team3: team3,
        team4: team4,
        scoreUpdated: true,
      });

      db.collection('Teams')
        .doc(this.state.userId)
        .update({
          [`team1.points`]: firebase.firestore.FieldValue.increment(
            this.state.team1Points
          ),
          [`team2.points`]: firebase.firestore.FieldValue.increment(
            this.state.team2Points
          ),
          [`team3.points`]: firebase.firestore.FieldValue.increment(
            this.state.team3Points
          ),
          [`team4.points`]: firebase.firestore.FieldValue.increment(
            this.state.team4Points
          ),
        });
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };
  getschoolTeams = async () => {
    console.log(this.state.eventId);
    if (this.state.scoreUpdated) {
      try {
        // await db
        // .collection('Events')
        // .doc(this.state.eventId)
        // .get()
        // .then((snapshot) => {
        //   var dbteams = [];
        //   snapshot.docs.map((doc) => {
        //     var team1 = doc.data().team1;

        //     var team2 = doc.data().team2;
        //     var team3 = doc.data().team3;
        //     var team4 = doc.data().team4;
        //     dbteams = [team1, team2, team3, team4];
        //     console.log(dbteams);
        //     this.setState({
        //       team1Name: dbteams[0].name,
        //       team1Color: dbteams[0].color,
        //       team1Points: dbteams[0].points,

        //       team2Name: dbteams[1].name,
        //       team2Color: dbteams[1].color,
        //       team2Points: dbteams[1].points,

        //       team3Name: dbteams[2].name,
        //       team3Color: dbteams[2].color,
        //       team3Points: dbteams[2].points,

        //       team4Name: dbteams[3].name,
        //       team4Color: dbteams[3].color,
        //       team4Points: dbteams[3].points,
        //     });
        //   });
        // });
        this.setState({
          team1Name: this.props.route.params.eventDetails['team1'].name,
          team1Color: this.props.route.params.eventDetails['team1'].color,
          team1Points: this.props.route.params.eventDetails['team1'].points,

          team2Name: this.props.route.params.eventDetails['team2'].name,
          team2Color: this.props.route.params.eventDetails['team2'].color,
          team2Points: this.props.route.params.eventDetails['team2'].points,

          team3Name: this.props.route.params.eventDetails['team3'].name,
          team3Color: this.props.route.params.eventDetails['team3'].color,
          team3Points: this.props.route.params.eventDetails['team3'].points,

          team4Name: this.props.route.params.eventDetails['team4'].name,
          team4Color: this.props.route.params.eventDetails['team4'].color,
          team4Points: this.props.route.params.eventDetails['team4'].points,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      await db
        .collection('Teams')
        .where('schoolId', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          var dbteams = [];
          snapshot.docs.map((doc) => {
            var team1 = doc.data().team1;
            var team2 = doc.data().team2;
            var team3 = doc.data().team3;
            var team4 = doc.data().team4;
            dbteams = [team1, team2, team3, team4];
          });
          this.setState({
            team1Name: dbteams[0].name,
            team1Color: dbteams[0].color,

            team2Name: dbteams[1].name,
            team2Color: dbteams[1].color,

            team3Name: dbteams[2].name,
            team3Color: dbteams[2].color,

            team4Name: dbteams[3].name,
            team4Color: dbteams[3].color,
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    }
  };

  componentDidMount() {
    this.getschoolTeams();
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={{flex:1}}>
        <LinearGradient
          colors={['#5d34a5', '#482980']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Events Details</Text>
        </LinearGradient>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <View style = {{marginRight:8, flexDirection:"row"}}>
      <MaterialIcons name="emoji-events" size={24} color="black"/>
     
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              marginTop:5,
              padding: 5,
              textAlign: 'left',
            }}>
            {this.state.eventname}
          </Text>
          </View>
          <View style = {{marginRight:8, flexDirection:"row"}}>
     <MaterialIcons name="description" size={24} color="black" />
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              marginTop: 10,
              padding: 5,
              textAlign: 'left',
            }}>
            {this.state.decription}
          </Text>
      </View>

          <View style = {{marginRight:8, flexDirection:"row"}}>
           
          <MaterialIcons name="date-range" size={24} color="black" />

          <Text
            style={{
              fontSize: 15,
              color: '#000',
              marginTop: 10,
              padding: 5,
              textAlign: 'left',
            }}>
            {this.state.date}
          </Text>
      </View>
      <View style = {{marginRight:8, flexDirection:"row"}}>

      <Ionicons name="time-outline" size={24} color="black" />
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              marginTop:5,
              padding: 5,
              textAlign: 'left',
            }}>
            {this.state.time}
          </Text>
          </View>

          <ScrollView
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 15,
              backgroundColor: '#7267CBaa',
              alignSelf: 'center',
              paddingBottom:50
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: 'gray',
                margin: 5,
                padding: 5,
                justifyContent: 'space-between',
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight:'bold',
                  color: this.state.team1Color.toLowerCase(),
                  marginTop: 20,
                  padding: 5,
                  textAlign: 'left',
                  width: '60%',
                }}>
                {this.state.team1Name}
              </Text>
              <TextInput
                placeholder="Points"
                keyboardType="numeric"
                placeholderTextColor="#fffa"
                onChangeText={(text) => {
                  this.setState({
                    team1Points: text,
                  });
                }}
                editable={!this.state.scoreUpdated}
                style={styles.input}
                value={this.state.team1Points}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderColor: 'gray',
                margin: 10,
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight:'bold',
                  color: this.state.team2Color.toLowerCase(),
                  marginTop: 20,
                  padding: 5,
                  textAlign: 'left',
                  width: '60%',
                }}>
                {this.state.team2Name}
              </Text>
              <TextInput
                placeholder="Points"
                keyboardType="numeric"
                placeholderTextColor="#fffa"
                editable={!this.state.scoreUpdated}
                onChangeText={(text) => {
                  this.setState({
                    team2Points: text,
                  });
                }}
                style={styles.input}
                value={this.state.team2Points}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderColor: 'gray',
                margin: 10,
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight:'bold',
                  color: this.state.team3Color.toLowerCase(),
                  marginTop: 20,
                  padding: 5,
                  textAlign: 'left',
                  width: '60%',
                }}>
                {this.state.team3Name}
              </Text>
              <TextInput
                placeholder="Points"
                keyboardType="numeric"
                placeholderTextColor="#fffa"
                editable={!this.state.scoreUpdated}
                onChangeText={(text) => {
                  this.setState({
                    team3Points: text,
                  });
                }}
                style={styles.input}
                value={this.state.team3Points}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderColor: 'gray',
                margin: 10,
                width: '95%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight:'bold',
                  color: this.state.team4Color.toLowerCase(),
                  marginTop: 20,
                  padding: 5,
                  textAlign: 'left',
                  width: '60%',
                }}>
                {this.state.team4Name}
              </Text>
              <TextInput
                placeholder="Points"
                keyboardType="numeric"
                placeholderTextColor="#fffa"
                editable={!this.state.scoreUpdated}
                onChangeText={(text) => {
                  this.setState({
                    team4Points: text,
                  });
                }}
                style={styles.input}
                value={this.state.team4Points}
              />
            </View>
            {this.state.scoreUpdated ? null : (
              <LinearGradient
                colors={['#612897', '#612897']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <TouchableOpacity
                  style={{
                    marginBottom: 50,
                    marginTop: 30,
                    width: '30%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.submitPoints();
                  }}>
                  <Text style={{color:'white',marginTop:10,}}>Submit</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </ScrollView>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: '40%',
    color:'white',
    borderColor: 'black',
    borderWidth: 2,
  },
});
