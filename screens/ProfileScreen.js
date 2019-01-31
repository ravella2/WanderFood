import React from 'react';
import { ScrollView, StyleSheet, Image, Text } from 'react-native';
import firebase from '../Firebase';


export default class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }

  static navigationOptions = {
    title: 'Profile',
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

  render() {
    const { currentUser } = this.state
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../assets/images/user1.png')} style={styles.image} />
        <Text>Hi {currentUser && currentUser.email}!</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 100
  }
});
