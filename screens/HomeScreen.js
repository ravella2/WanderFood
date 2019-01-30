import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import firebase from '../Firebase';
import { Card, Button } from 'react-native-elements';



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Cities');
        this.unsubscribe = null;

        this.state = {
            loading: true,
            cities: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            const { name, description } = doc.data();
            cities.push({
            key: doc.id,
            doc, 
            name,
            description
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
        return (
            <ScrollView>
            {this.state.cities.map((item, i) => (
                    <Card key={i} title={item.name} image={require('../assets/images/la.jpeg')}>
                        <Text style={{marginBottom: 10}}>{item.description}</Text>
                        <Button
                            onPress={() => this.props.navigation.navigate('City')}
                            backgroundColor='#03A9F4'
                            title='Find the best local dish' />
                    </Card> 
                ))}
            </ScrollView>
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