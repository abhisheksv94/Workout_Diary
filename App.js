/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './Components/Home';

const Navigation=StackNavigator({
  Home:{
    screen:Home
  },
});

export default class App extends Component {
  render() {
    return (
      <Navigation/>
    );
  }
}

