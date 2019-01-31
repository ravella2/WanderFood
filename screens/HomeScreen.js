import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import firebase from '../Firebase';
import { Card, Button, Header } from 'react-native-elements';



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Cities');
        this.unsubscribe = null;

        this.state = {
            currentUser: null,
            loading: true,
            cities: []
        };
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            const { name, description, latitude, longitude} = doc.data();
            cities.push({
            key: doc.id,
            doc, 
            name,
            description,
            latitude,
            longitude
            });
        });
        this.setState({
            cities,
            isLoading: false,
        });
    }

    static navigationOptions = {
        header: null,
    };


    render() {
        const { currentUser } = this.state
        return (
            <View>
            <Header centerComponent={{text: 'WanderFood'}} />
            <ScrollView contentContainerStyle={{paddingBottom: 90}}>
            {this.state.cities.map((item, i) => (
                    <Card key={i} title={item.name} image={require('../assets/images/la.jpeg')}>
                        <Text style={{marginBottom: 10}}>{item.description}</Text>
                        <Button
                            onPress={() => this.props.navigation.navigate('City')}
                            backgroundColor='#4267B2'
                            title='Find the best local dish' />
                    </Card> 
                ))}
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  card: {
      justifyContent: 'space-between',
      margin: 5,
  },
  button: {
      justifyContent: 'center',
  },
  headings: {
      textAlign: 'center'
  }
})