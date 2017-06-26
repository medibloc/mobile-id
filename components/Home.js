import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'KeySetup'})
      ]
    })

    AsyncStorage.getItem('@Medibloc:priKey').then((priKey) => {
      if (priKey === null) {
        Alert.alert(
          'Account not found',
          'You should create or restore your Medibloc account.',
          [
            {text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction)},
          ],
          { cancelable: false }
        )
      } else {

      }
    })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4394CE'
      }}>
        <Text style={{fontSize: 32, color: 'white'}}>MediTag</Text>
      </View>
    )
  }
}
