import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TextInput, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class CreateAccount extends React.Component {
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
      <View>
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
        AsyncStorage.setItem('@Medibloc:priKey', o.key, (e) => {
          if (e) {
            console.log('Private key could not be stored: ' + e)
            return
          }
          console.log('Account created!!')
        })
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({sentRequest: true})
  }

  render() {
    return (
      this.state.sentRequest ?
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
