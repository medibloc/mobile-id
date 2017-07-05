import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TouchableHighlight } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class AccountSetup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={[styles.listItem, {backgroundColor: 'red'}]}
          onPress={() => this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'CreateAccount'})
            ]
          }))}>
          <Text style={{fontSize: 32, color: 'white'}}>Create New Account</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.listItem, {backgroundColor: 'orange'}]}>
          <Text style={{fontSize: 32, color: 'white'}}>Restore Original Account</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  listItemText: {
    color: 'white',
    fontSize: 30,
  }
});
