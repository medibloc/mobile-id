import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert, Button, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import socketIo from 'socket.io-client'
import * as actionCreators from '../action_creators'

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  sendLoginVerification() {
    let socketClient = socketIo('http://localhost:7080')
    AsyncStorage.getItem('@MediBloc:priKey', (e, r) => {
      socketClient.emit('action', {
        type: 'VERIFY_LOGIN',
        email: this.props.email,
        account: this.props.account,
        priKey: r
      })
    })
  }

  render() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 200}}>
        <View style={[styles.row, {marginBottom: 30}]}>
          <View style={styles.item}>
            {this.props.isDoctor === true ?
              <Text>Hello Dr. {this.props.name}</Text>
              :
              <Button title="Are you a medical doctor?"
                disabled={this.props.isDoctor}
                onPress={() => this.props.registerLicense()}
              />
            }
            <Button title="Verify Login on Dolphin"
              onPress={() => this.sendLoginVerification()}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    isDoctor: state.main.getIn(['user', 'isDoctor']),
    name: state.main.getIn(['user', 'profile', 'name']),
    email: state.main.getIn(['user', 'email']),
    account: state.main.getIn(['user', 'account']),
  }
}

export const MenuContainer = connect(
  mapStateToProps,
  actionCreators
)(Menu)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  label: {
    flex: 1,
    height: 40,
    paddingTop: 10
  },

  labelText: {
    textAlign: 'right',
    paddingRight: 30
  },

  item: {
    flex: 1,
    height: 40,
    paddingTop: 10
  },

  itemText: {
    textAlign: 'left',
    paddingLeft: 30
  },

  nameText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28
  },
});
