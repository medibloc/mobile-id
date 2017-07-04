import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Lounge extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'KeySetup'})
      ]
    })

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

        AsyncStorage.getItem('@MediBloc:email', (e, r) => {
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
          let email = r

          fetch('http://localhost:3000/show', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              account: account,
              priKey: priKey
            })
          })
          .then((r) => r.json())
          .then((o) => {
            console.log(o)
            o.gotProfile = true
            this.setState(o)
          })
          .catch((err) => {
            console.error(err)
            Alert.alert(err)
          })
        })
      })
    })
  }

  render() {
    return (
      this.state.gotProfile === undefined ?
        <View style={{flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 32, color: 'white'}}>Fetching profile...</Text>
        </View>
      :
        <ScrollView style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>{this.state.name}</Text>
          <Text>{this.state.isFemale ? 'Female' : 'Male'}</Text>
          <Text>{this.state.birthY}/{this.state.birthM}/{this.state.birthD}</Text>
          <Text>{this.state.height/10.} CM</Text>
          <Text>{this.state.weight} KG</Text>
        </ScrollView>
    )
  }
}
