import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View } from 'react-native';
import firebase from '../Firebase';
import { Card } from 'react-native-elements';


export default class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Posts');
    this.state = {
      currentUser: null,
      posts: [],
      loading: true
    }
  }

  static navigationOptions = {
    title: 'Profile',
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}

  onCollectionUpdate = (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
        const { Food, Review, Restaurant, Author, restaurantName} = doc.data();
        posts.push({
        key: doc.id,
        doc, 
        Food,
        Review,
        Restaurant,
        Author,
        restaurantName
        });
    });
    this.setState({
        posts,
        isLoading: false,
    });
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/user1.png')} style={styles.image} />
        <Text style={styles.headings}>User: {currentUser && currentUser.email}!</Text>
        <ScrollView>
        {this.state.posts.map((item, i) => (
            <Card key={i} title={item.Food} image={require('../assets/images/taco.jpg')}>
                <Text style={{marginBottom: 10}}>{item.Review}</Text>
                <Text>From: {item.restaurantName}</Text>
            </Card>
            ))}
          </ScrollView>
      </View>
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
  },
  headings: {
    fontSize:20
  }
});
