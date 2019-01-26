import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Hi</Text>
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
});
