import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import AccountSetup from './components/AccountSetup'
import CreateAccount from './components/CreateAccount'
import GetProfile from './components/GetProfile'
import Lounge from './components/Lounge'

const MainNavigator = StackNavigator({
  Home: { screen: Home },
  AccountSetup: { screen: AccountSetup },
  CreateAccount: { screen: CreateAccount },
  GetProfile: { screen: GetProfile },
  Lounge: { screen: Lounge },
});

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
