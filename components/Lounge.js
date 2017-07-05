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
        NavigationActions.navigate({routeName: 'AccountSetup'})
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
        <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 20}}>
          <View style={[styles.row, {marginBottom: 30}]}>
            <View style={styles.item}>
              <Text style={styles.nameText}>{this.state.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Age</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{new Date().getFullYear() - this.state.birthY}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Sex</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.state.isFemale ? 'Female' : 'Male'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Birthday</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.state.birthY} / {this.state.birthM} / {this.state.birthD}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Height</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.state.height/10.} cm</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Weight</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.state.weight} kg</Text>
            </View>
          </View>
        </ScrollView>
    )
  }
}

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
