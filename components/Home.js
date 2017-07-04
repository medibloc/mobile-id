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

    if (this.props.navigation.state.params === undefined ||
      this.props.navigation.state.params.noReset === undefined) {
      AsyncStorage.removeItem('@MediBloc:priKey').then(() => {
        AsyncStorage.getItem('@MediBloc:priKey').then((priKey) => {
          if (priKey === null) {
            Alert.alert(
              'Account not found',
              'You should create or restore your MediBloc account.',
              [
                {text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction)},
              ],
              { cancelable: false }
            )
          } else {

          }
        })
      })
    } else {
      AsyncStorage.getItem('@MediBloc:priKey').then((priKey) => {
        if (priKey === null) {
          Alert.alert(
            'Account not found',
            'You should create or restore your MediBloc account.',
            [
              {text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction)},
            ],
            { cancelable: false }
          )
        } else {
          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Lounge'})
            ]
          }))
        }
      })
    }
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
