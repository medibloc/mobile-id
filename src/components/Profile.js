import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert } from 'react-native'
import { toJS } from 'immutable'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      this.props.name === undefined ?
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
              <Text style={styles.nameText}>{this.props.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>MediCoin</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.balance} MED</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Age</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{new Date().getFullYear() - this.props.birthY}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Sex</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.isFemale ? 'Female' : 'Male'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Birthday</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {this.props.birthY} / {this.props.birthM} / {this.props.birthD}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Height</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.height/10.} cm</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}><Text style={styles.labelText}>Weight</Text></View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.weight} kg</Text>
            </View>
          </View>
        </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.main.getIn(['user', 'profile', 'name']),
    balance: state.main.getIn(['user', 'balance']),
    birthY: state.main.getIn(['user', 'profile', 'birthY']),
    birthM: state.main.getIn(['user', 'profile', 'birthM']),
    birthD: state.main.getIn(['user', 'profile', 'birthD']),
    height: state.main.getIn(['user', 'profile', 'height']),
    weight: state.main.getIn(['user', 'profile', 'weight']),
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  actionCreators
)(Profile)

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
