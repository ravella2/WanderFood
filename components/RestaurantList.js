import React, { Component } from 'react';
import { ScrollView, View, TextInput, Button, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import firebase from '../Firebase';
import Restaurant from '../components/Restaurant';

class RestaurantList extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Restaurants');
        this.unsubscribe = null;

        this.state = {
            textInput: '',
            loading: true,
            restaurants: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const restaurants = [];

        querySnapshot.forEach((doc) => {
            const { name } = doc.data();
            restaurants.push({
                key: doc.id,
                doc,
                name
            });
        });

    this.setState({ 
        restaurants,
        loading: false
    });
}

    updateTextInput(value) {
        this.setState({ textInput: value });
    }

    addRestaurant() {
        this.ref.add({
            name: this.state.textInput,
        });
        this.setState({
            textInput: '',
        });
    }

    render() {
        if (this.state.loading) {
            return null; 
        }

        return(
            <View>
            <FlatList 
                data={this.state.restaurants}
                renderItem={({item}) => <Restaurant {...item} /> }
            />
            <TextInput
                placeholder={'Add Restaurant'}
                value={this.state.textInput}
                onChangeText={(text) => this.updateTextInput(text)}
            />
            <Button
                title={'Add Restaurant'}
                disabled={!this.state.textInput.length}
                onPress={() => this.addRestaurant()}
            />
            </View>
        )
    }
}

export default RestaurantList