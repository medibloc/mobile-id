import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TextInput, Picker, Button, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class GetPatient extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add Patients",
  })

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      patientInfo: null
    }

    this.today = new Date()
  }

  profileForm() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <TextInput style={{height: 40}}
          placeholder="Patient's Email Address"
          onChangeText={(email) => this.setState({email})}
        />
        <Button title="Search"
          disabled={this.state.email.length == 0 || this.props.sentRequest === true}
          onPress={() => this.search()}
        />
        {this.renderPatientInfo()}
      </ScrollView>
    )
  }

  renderPatientInfo() {
    if (this.state.patientInfo) {
      return (
        <View>
          <Text style={{
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 20,
            fontSize: 18
          }}>Result</Text>
          <View  style={{flexDirection: 'row'}}>
            <View style={{
              flex: 7,
            }}>
              <Text>Name: {this.state.patientInfo.profile.name}</Text>
              <Text>Age: {this.state.patientInfo.profile.age}</Text>
              <Text>Sex: {this.state.patientInfo.profile.isFemale ? 'Female' : 'Male'}</Text>
            </View>
            <TouchableHighlight
              style={{
                flex: 3,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.props.addPatient(this.state.email,
                  this.state.patientInfo.account,
                  this.state.patientInfo.profile)
                this.props.goBack()
                }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Add</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    }
  }

  search() {
    fetch('http://localhost:3000/search_by_email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then((r) => r.json())
      .then((o) => {
        console.log(o)
        if (o.account && o.profile) {
          this.setState({patientInfo: o})
        } else {
          this.setState({patientInfo: null})
        }
        this.props.gotResponse()
      })
      .catch((error) => {
        console.error(error)
      })
    this.props.sentRequest()
  }

  render() {
    return (
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

export const GetPatientContainer = connect(
  mapStateToProps,
  actionCreators
)(GetPatient)
