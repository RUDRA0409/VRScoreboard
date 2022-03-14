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
  FlatList,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import db from '../config';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
      teamsInfo: [],
      email: firebase.auth().currentUser.email,
      totalPoints: 0,
    };
  }
  getEvents = async () => {
    await db
      .collection('Events')
      .where('schoolId', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var events = [];
        snapshot.docs.map((doc) => {
          var event = doc.data();
          event['docId'] = doc.id;
          events.push(event);
        });

        this.setState({
          upcomingEvents: events,
        });
      });

    await db
      .collection('Teams')
      .where('schoolId', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var dbteams = [];
        var totalPoints = 0;
        snapshot.docs.map((doc) => {
          var team1 = doc.data().team1;
          var team2 = doc.data().team2;
          var team3 = doc.data().team3;
          var team4 = doc.data().team4;
          totalPoints =
            doc.data().team1.points +
            doc.data().team2.points +
            doc.data().team3.points +
            doc.data().team4.points;

          var team1P = (doc.data().team1.points / totalPoints) * 100;
          var team2P = (doc.data().team2.points / totalPoints) * 100;
          var team3P = (doc.data().team3.points / totalPoints) * 100;
          var team4P = (doc.data().team4.points / totalPoints) * 100;

          team1['percent'] = team1P.toString() + '%';
          team2['percent'] = team2P.toString() + '%';
          team3['percent'] = team3P.toString() + '%';
          team4['percent'] = team4P.toString() + '%';
          dbteams = [team1, team2, team3, team4];
          console.log(dbteams);
        });
        this.setState({ teamsInfo: dbteams, totalPoints: totalPoints });
      });
  };
  componentDidMount = () => {
    this.getEvents();
  };
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

        <Image
          style={{
            height: '22%',
            width: '80%',
            margin: 15,
            alignSelf: 'center',
            borderRadius: 10,
            overflow: 'hidden',
          }}
          source={require('../assets/WelcomeCard.png')}
        />
          <Text style={{fontWeight:"bold"}}>LeaderBoard</Text>

        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
          }}
          resizeMode="cover"
          source={require('../assets/bg.jpg')}>
          <View style={{ margin: 10, justifyContent: 'center' }}>
            {this.state.teamsInfo.map((team) => (
              <View
                style={{
                  backgroundColor: '#00000088',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    width: '20%',
                    marginLeft: 10,
                    padding: 5,
                    margin: 2,
                  }}>
                  {team.name}
                </Text>
                <LinearGradient
                  colors={[team.color.toLowerCase(), '#ffffffaa']}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    marginVertical: 5,
                    marginHorizontal: '2%',
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                    padding: 2,
                    width: team.percent,
                  }}>
                  <Text>{team.points}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        
        </ImageBackground>
<TouchableOpacity
onPress = {()=>{
  this.props.navigation.navigate('EventsScreen')
}}
>
<Text 
style = {{marginLeft:270,
color:'blue'}}
>
View all</Text>
</TouchableOpacity>

        <FlatList
          style={{ height: '10%' }}
          data={this.state.upcomingEvents}
          renderItem={({ item }) => (
            <LinearGradient
              // Button Linear Gradient
              colors={['#98BAE7', '#7267CB']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width:200,
                borderWidth: 1,
                borderRadius: 5,
                margin: 3,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff' }}>{item.eventname}</Text>
              <Text style={{ color: '#fff' }}>{item.decription}</Text>
              <Text style={{ color: '#fff' }}>{item.time}</Text>
              <Text style={{ color: '#fff' }}>{item.date}</Text>
            </LinearGradient>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <View style={{ height: '8%' }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:"#fff" },
  heading: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 16,
    color: 'white',
  },
});
