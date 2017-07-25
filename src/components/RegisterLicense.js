import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  TextInput,
  Picker,
  Button,
  Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class RegisterLicense extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      institution: '',
      role: '',
    }
  }

  registerForm() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <TextInput style={{height: 40}}
          placeholder="Institution"
          onChangeText={(institution) => this.setState({institution})}
        />
        <TextInput style={{height: 40}}
          placeholder="Job role"
          onChangeText={(role) => this.setState({role})}
        />
        <Button title="Register"
          disabled={this.state.institution.length == 0 ||
            this.state.role.length == 0 ||
            this.props.sentRequestFlg === true}
          onPress={() =>
            this.register()}
        />
      </ScrollView>
    )
  }

  register() {
    this.props.sentRequest()
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.email,
        account: this.props.account,
        institution: this.state.institution,
        role: this.state.role
      })
    })
      .then((r) => r.json())
      .then((o) => {
        console.log(o)
        this.props.gotResponse()
        if (o.result === true) {
          this.props.licenseRegistered({
            institution: o.inst,
            role: o.role
          })
        }
        this.props.goHome()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      this.props.sentRequestFlg === true ?
        <View style={{flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 32, color: 'white'}}>Requesting license confirmation...</Text>
        </View>
      :
        this.registerForm()
    )
  }
}

function mapStateToProps(state) {
  return {
    sentRequestFlg: state.main.get('sentRequest'),
    email: state.main.getIn(['user', 'email']),
    account: state.main.getIn(['user', 'account']),
  }
}

export const RegisterLicenseContainer = connect(
  mapStateToProps,
  actionCreators
)(RegisterLicense)
