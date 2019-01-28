import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps'

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 34.05223,
                longitude: -118.24368,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
        };
    };

    onRegionChange = (region) => {
        this.setState({ region });
    }

    render() {
        return (
            <MapView
            style={{flex: 1, marginBottom: 150}}
            provider='google'
            region={this.state.region}
            onRegionChange={this.onRegionChange} 
            />
            
        )
    }
}

export default City