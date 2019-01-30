import React, { Component } from 'react';
import MapView from 'react-native-maps'
import { Text } from 'react-native'

class Maps extends Component {
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
            style={{marginBottom: 10, height:200}}
            provider='google'
            region={this.state.region}
            onRegionChange={this.onRegionChange} 
            />
        )
    }
}

export default Maps