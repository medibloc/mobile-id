import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  loadAccount(next) {
    if (this.props.account !== undefined && this.props.email !== undefined) {
      AsyncStorage.get('@MediBloc:priKey', (e, r) => {
        return next(null, {
          priKey: r,
          account: this.props.account,
          email: this.props.email
        })
      })
    } else {
      let priKey, account, email
      // AsyncStorage.removeItem('@MediBloc:priKey').then(() => {
      // AsyncStorage.removeItem('@MediBloc:patients').then(() => {
        AsyncStorage.multiGet(
          ['@MediBloc:priKey', '@MediBloc:account', '@MediBloc:email'],
          (e, r) => {
            priKey = r[0][1]
            account = r[1][1]
            email = r[2][1]

            if (priKey !== null && account !== null && email !== null) {
              this.props.setAccount(email, account)
              return next(null, {priKey, account, email})
            } else {
              return next(new Error('Account not found'))
            }
          }
        )
      // })
    }
  }

  componentDidMount() {
    this.loadAccount((e, r) => {
      if (e) {
        this.props.setupAccount()
      } else {
        let priKey = r.priKey
        let account = this.props.account
        let email = this.props.email

        fetch('http://localhost:3000/show', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.props.email,
            account: this.props.account,
            priKey: priKey
          })
        })
        .then((r) => r.json())
        .then((o) => {
          console.log(o)
          this.props.setProfile(o.profile, o.balance, o.isDoctor)
          if (o.isDoctor === true) {
            this.setState({routes: [
              { key: '1', title: 'Profile' },
              { key: '2', title: 'History' },
              { key: '3', title: 'Patients' },
              { key: '4', title: 'Menu' },
            ]})
          }
        })
        .catch((err) => {
          console.error(err)
          Alert.alert(err)
        })

        fetch('http://localhost:3000/histories', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.props.email,
            account: this.props.account,
            priKey: priKey
          })
        })
        .then((r) => r.json())
        .then((o) => {
          this.props.setHistories(o)
          this.props.goLounge()
        })
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

function mapStateToProps(state) {
  return {
    account: state.main.getIn(['user', 'account']),
    email: state.main.getIn(['user', 'email']),
  }
}

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home)
