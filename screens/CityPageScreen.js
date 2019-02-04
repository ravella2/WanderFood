import React, { Component } from 'react';
import MapView from 'react-native-maps'
import firebase from '../Firebase';
import {  View, TextInput, Button, FlatList, Text, KeyboardAvoidingView} from 'react-native';
import Swipeout from 'react-native-swipeout';



class CityPage extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Restaurants');
        this.unsubscribe = null;

        this.state = {
            textInput: '',
            loading: true,
            restaurants: [],
            currentUser: null,
        };
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                }}
            />
            );
        };

    componentDidMount() {
        const currentUser = firebase.auth()
        this.setState({ currentUser })
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const restaurants = [];

        querySnapshot.forEach((doc) => {
            const { name, author } = doc.data();
            restaurants.push({
                key: doc.id,
                doc,
                name,
                author
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
            latitude: this.props.navigation.state.params.latitude,
            longitude: this.props.navigation.state.params.longitude,
            author: this.state.currentUser.currentUser.uid
        });
        this.setState({
            textInput: '',
        });
    }

    deleteRestaurant= i => {
        this.setState(
        prevState => {
            let restaurants = prevState.restaurants.slice();
            restaurants.splice(i, 1);
            return { restaurants: restaurants };
        },
        );
    };

    render() {

        if (this.state.loading) {
            return null; 
        }
        return (
            <KeyboardAvoidingView behavior="padding">
            <MapView 
                style={{marginBottom: 10, height:160}}
                initialRegion={{
                    latitude: this.props.navigation.state.params.latitude,
                    longitude: this.props.navigation.state.params.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} />
                <View style={{height: 150}}>
                    <FlatList 
                        ItemSeparatorComponent={this.renderSeparator}
                        data={this.state.restaurants}
                        renderItem={({item, index}) => 
                        <Swipeout right={[{
                            text: 'Delete',
                            backgroundColor: 'red',
                            underlayColor: 'red',
                            onPress: () => { this.deleteRestaurant(index) }
                        }]}
                        autoClose={true}
                        backgroundColor= 'transparent'>
                            <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 8 }}>
                                    <Text style={{textAlign:'justify'}}>{item.name}</Text>
                                </View>
                            </View>
                        </Swipeout> }
                    />
                </View>
            <Text style={{fontWeight: 'bold', color: 'blue', textAlign: 'center', fontSize: 18, marginTop: 5}}>Add a new restaurant!</Text>
            <TextInput
                style={{margin: 50}}
                placeholder={'Name of Restaurant'}
                value={this.state.textInput}
                onChangeText={(text) => this.updateTextInput(text)}
            />
            <Button
                title={'Add Restaurant'}
                disabled={!this.state.textInput.length}
                onPress={() => this.addRestaurant()}
            />
            </KeyboardAvoidingView>
        )
    }
}

export default CityPage