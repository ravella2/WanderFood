import React, { Component } from 'react';
import Maps from '../components/Map';
import RestaurantList from '../components/RestaurantList';



class CityPage extends Component {
    render() {
        return (
            <>
            <Maps />  
            <RestaurantList />   
            </>
        )
    }
}

export default CityPage