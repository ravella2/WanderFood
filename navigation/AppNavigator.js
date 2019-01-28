import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen';


export default createAppContainer(createSwitchNavigator({
  Login: Login,
  Main: MainTabNavigator,
}));