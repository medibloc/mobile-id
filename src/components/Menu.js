import React from 'react'
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert, Button, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 200}}>
        <View style={[styles.row, {marginBottom: 30}]}>
          <View style={styles.item}>
            {this.props.isDoctor === true ?
              <Text>Hello Dr. {this.props.name}</Text>
              :
              <Button title="Are you a medical doctor?"
                disabled={this.props.isDoctor}
                onPress={() => this.props.registerLicense()}
              />
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    isDoctor: state.main.getIn(['user', 'isDoctor']),
    name: state.main.getIn(['user', 'profile', 'name'])
  }
}

export const MenuContainer = connect(
  mapStateToProps,
  actionCreators
)(Menu)

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
