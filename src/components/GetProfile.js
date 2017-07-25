import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TextInput, Picker, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class GetProfile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isFemale: true,
      birthY: 1991,
      birthM: 2,
      birthD: 24,
      height: '',
      weight: ''
    }

    this.today = new Date()
  }

  profileForm() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <TextInput style={{height: 40}}
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
        />
        <Picker style={{marginTop: 30, marginLeft: 30, marginRight: 30}}
          selectedValue={this.state.isFemale}
          onValueChange={(itemValue, itemIndex) => this.setState({isFemale: itemValue})}>
          <Picker.Item label="Female" value={true} />
          <Picker.Item label="Male" value={false} />
        </Picker>
        <TextInput style={{height: 40}}
          placeholder="Born year (4 digits)"
          keyboardType="numeric"
          onChangeText={(birthY) => this.setState({birthY})}
        />
        <TextInput style={{height: 40}}
          placeholder="Born month"
          keyboardType="numeric"
          onChangeText={(birthM) => this.setState({birthM})}
        />
        <TextInput style={{height: 40}}
          placeholder="Born day"
          keyboardType="numeric"
          onChangeText={(birthD) => this.setState({birthD})}
        />
        <TextInput style={{height: 40}}
          placeholder="Height(MM)"
          keyboardType="numeric"
          onChangeText={(height) => this.setState({height})}
        />
        <TextInput style={{height: 40}}
          placeholder="Weight(KG)"
          keyboardType="numeric"
          onChangeText={(weight) => this.setState({weight})}
        />
        <Button title="Sign Up"
          style={{marginBottom: 100}}
          disabled={this.state.name.length == 0 ||
            this.state.height.length == 0 ||
            this.state.weight.length == 0 ||
            this.state.birthY.length != 4}
          onPress={() =>
            this.updateProfile(this.props.email)}
        />
      </ScrollView>
    )
  }

  updateProfile(email) {
    AsyncStorage.getItem('@MediBloc:account', (e, r) => {
      if (e) {
        console.log(e)
        alert('Account could not be found!!')
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'CreateAccount'})
          ]
        }))
        return
      }

      let account = r

      AsyncStorage.getItem('@MediBloc:priKey', (e, r) => {
        if (e) {
          console.log(e)
          alert('Private key could not be found!!')
          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'CreateAccount'})
            ]
          }))
          return
        }

        let priKey = r

        fetch('http://localhost:3000/update', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            account: account,
            priKey: priKey,
            profile: this.state
          })
        })
          .then((r) => r.json())
          .then((o) => {
            console.log(o)
            this.props.gotResponse()
            this.props.goHome()
          })
          .catch((error) => {
            console.error(error);
          });
        this.props.sentRequest()
      })
    })
  }

  render() {
    return (
      this.props.sentRequestFlg === true ?
        <View style={{flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 32, color: 'white'}}>Updating account...</Text>
        </View>
      :
        this.profileForm()
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.main.getIn(['user', 'email']),
    account: state.main.getIn(['user', 'account']),
    sentRequestFlg: state.main.get('sentRequest')
  }
}

export const GetProfileContainer = connect(
  mapStateToProps,
  actionCreators
)(GetProfile)
