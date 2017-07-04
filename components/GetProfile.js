import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TextInput, Picker, Button, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class CreateAccount extends React.Component {
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
        <Picker style={{marginTop: 30, marginLeft: 30, marginRight: 30}}
          selectedValue={this.state.birthY}
          onValueChange={(itemValue, itemIndex) => this.setState({birthY: itemValue})}>
          {Array(120).fill().map((_, i) =>
            <Picker.Item key={i} label={"" + (i + this.today.getFullYear() - 120)}
              value={i + this.today.getFullYear() - 120} />
          )}
        </Picker>
        <Picker style={{marginTop: 30, marginLeft: 30, marginRight: 30}}
          selectedValue={this.state.birthM}
          onValueChange={(itemValue, itemIndex) => this.setState({birthM: itemValue})}>
          {Array(12).fill().map((_, i) =>
            <Picker.Item key={i} label={"" + (i + 1)}
              value={i + 1} />
          )}
        </Picker>
        <Picker style={{marginTop: 30, marginLeft: 30, marginRight: 30}}
          selectedValue={this.state.birthD}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({birthD: itemValue})}>
          {Array(31).fill().map((_, i) =>
            <Picker.Item key={i} label={"" + (i + 1)}
              value={i + 1} />
          )}
        </Picker>
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
          disabled={this.state.name.length == 0 ||
            this.state.height.length == 0 ||
            this.state.weight.length == 0}
          onPress={() =>
            this.updateProfile(this.props.navigation.state.params.email,
              this.props.navigation.state.params.password)}
        />
      </ScrollView>
    )
  }

  updateProfile(email, password) {
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
            password: password,
            account: account,
            priKey: priKey,
            profile: this.state
          })
        })
          .then((r) => r.json())
          .then((o) => {
            console.log(o)
            this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Home', params: {
                  noReset: true
                }})
              ]
            }))
          })
          .catch((error) => {
            console.error(error);
          });
        this.setState({sentRequest: true})
      })
    })
  }

  render() {
    return (
      this.state.sentRequest ?
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
