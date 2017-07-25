import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class CreateAccount extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sentRequest: false,
      email: '',
      password: ''
    }
  }

  signUpForm() {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <TextInput style={{height: 40}}
          placeholder="Email Address"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput style={{height: 40}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Sign Up"
          disabled={this.state.email.length == 0 || this.state.password.length == 0}
          onPress={() => this.requestSignUp(this.state.email, this.state.password)}
        />
      </View>
    )
  }

  requestSignUp(email, password) {
    this.props.sentRequest()
    fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then((r) => r.json())
      .then((o) => {
        console.log(o)
        this.props.gotResponse()
        AsyncStorage.setItem('@MediBloc:priKey', o.key, (e) => {
          if (e) {
            console.log('Private key could not be stored: ' + e)
            return
          }
          console.log('Account created!!')

          AsyncStorage.setItem('@MediBloc:account', o.account, (e) => {
            if (e) {
              console.log('Account could not be stored: ' + e)
              return
            }

            AsyncStorage.setItem('@MediBloc:email', email, (e) => {
              if (e) {
                console.log('Email address could not be stored: ' + e)
                return
              }
              this.props.setAccount(email, o.account)
              this.props.getProfile()
            })
          })
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      this.props.sentRequestFlg ?
        <View style={{flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 32, color: 'white'}}>Creating account...</Text>
        </View>
      :
        this.signUpForm()
    )
  }
}

function mapStateToProps(state) {
  return {
    sentRequestFlg: state.main.get('sentRequest')
  }
}

export const CreateAccountContainer = connect(
  mapStateToProps,
  actionCreators
)(CreateAccount)
