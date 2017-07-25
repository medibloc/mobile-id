import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class AccountSetup extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={[styles.listItem, {backgroundColor: 'red'}]}
          onPress={() => this.props.createAccount()}>
          <Text style={{fontSize: 32, color: 'white'}}>Create Account</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.listItem, {backgroundColor: 'orange'}]}>
          <Text style={{fontSize: 32, color: 'white'}}>Restore Account</Text>
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
})

function mapStateToProps(state) {
  return {}
}

export const AccountSetupContainer = connect(
  mapStateToProps,
  actionCreators
)(AccountSetup)
