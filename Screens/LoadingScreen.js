import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Login from './Login';

import db from '../config';
export default class Loading extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;

        db.collection('users')
          .where('email', '==', user.email)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              console.log(doc.data().isTeamsAdded)
              var isTeamsAdded =doc.data().isTeamsAdded
              if (isTeamsAdded==true) {
                this.props.navigation.navigate('Home');
              } else {
                this.props.navigation.navigate('AddTeamDetails');
              }
            });
          });
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#D4A608"
          style={styles.spinner}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginTop: 100,
  },
});
