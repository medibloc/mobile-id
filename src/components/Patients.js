import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ListView, AsyncStorage, Modal } from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

class Patients extends React.PureComponent {
  static navigationOptions = {
    title: 'Patients',
    header: null,
  }

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  constructor(props) {
    super(props)
  }

  renderPatientsList() {
    if (this.props.patients.length > 0) {
      return (
        <View>
          <Text style={{
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 20,
            fontSize: 22
          }}>Your Patients</Text>
          <ListView
            dataSource={
              this.ds.cloneWithRows(this.props.patients)
            }
            renderRow={(rowData) =>
              <View style={[styles.row, {flexDirection: 'row'}]}>
                <View style={{flex: 6}}>
                  <Text>{rowData.profile.name}</Text>
                  <Text>{rowData.profile.age}</Text>
                  <Text>{rowData.profile.isFemale ? 'Female' : 'Male'}</Text>
                </View>
                <TouchableHighlight
                  style={{
                    flex: 4,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.props.writeHistory(rowData.email, rowData.account, rowData.profile)}>
                  <Text style={{textAlign: 'center', color: 'white'}}>Update History</Text>
                </TouchableHighlight>
              </View>
            }
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          style={{
            height: 60,
            backgroundColor: '#2196F3',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => {this.props.getPatient()}}
          >
          <Text style={{color: 'white', fontSize: 18}}>Add New Patient</Text>
        </TouchableHighlight>
        {this.renderPatientsList()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    patients: state.main.getIn(['doctor', 'patients']) ? state.main.getIn(['doctor', 'patients']).toJS() : []
  }
}

export const PatientsContainer = connect(
  mapStateToProps,
  actionCreators
)(Patients)

const styles = StyleSheet.create({
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
})
