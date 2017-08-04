import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TextInput, Picker, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class WriteHistory extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      diseaseName: '',
      prescription: '',
      description: '',
    }

    this.today = new Date()
  }

  profileForm() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <TextInput style={{height: 40}}
          placeholder="Disease Name"
          onChangeText={(diseaseName) => this.setState({diseaseName})}
        />
        <TextInput style={{height: 40}}
          placeholder="Prescription"
          onChangeText={(prescription) => this.setState({prescription})}
        />
        <TextInput style={{height: 40}}
          placeholder="Description"
          onChangeText={(description) => this.setState({description})}
        />
        <Button title="Post History"
          style={{marginBottom: 100}}
          disabled={this.state.diseaseName.length == 0 ||
            this.state.prescription.length == 0 ||
            this.state.description.length == 0 ||
            this.props.sentRequest === true
          }
          onPress={() =>
            this.postHistory()}
        />
      </ScrollView>
    )
  }

  postHistory() {
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

      fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: {
            email: this.props.patient.email,
            account: this.props.patient.account,
          },
          author: {
            email: this.props.author.email,
            account: this.props.author.account,
            priKey
          },
          content: {
            disease: this.state.disease,
            prescription: this.state.prescription,
            description: this.state.description
          }
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
    patient: {
      email: state.main.getIn(['doctor', 'historyWriting', 'email']),
      account: state.main.getIn(['doctor', 'historyWriting', 'account']),
    },
    author: {
      email: state.main.getIn(['user', 'email']),
      account: state.main.getIn(['user', 'account']),
    },
    profile: state.main.getIn(['doctor', 'historyWriting', 'profile']).toJS(),
    sentRequest: state.main.get('sentRequest')
  }
}

export const WriteHistoryContainer = connect(
  mapStateToProps,
  actionCreators
)(WriteHistory)
