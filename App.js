import React, { Component } from 'react';
import {Stylesheet,Text,View} from 'react-native';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import Home from './Components/Home';
import Exercise from './Components/Exercise';

const Navigation=StackNavigator({
  Home:{screen:Home},
  Exercise:{screen:Exercise}
});

export default class App extends Component {
  render() {
    return (
      <Navigation/>
    );
  }
}