import React from 'react'
import { StyleSheet, Text, View, ListView, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export default class History extends React.PureComponent {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentDidMount() {
    console.log('**** Histories: ' + JSON.stringify(this.props.histories))
  }

  render() {
    if (this.props.histories.length > 0) {
      return (
        <ListView
          removeClippedSubviews={false} //A workaround for a bug where the list items are not shown until scroll
          dataSource={this.ds.cloneWithRows(this.props.histories)}
          renderRow={(rowData) =>
            <View style={styles.row}>
              <Text>{rowData.diseaseName}</Text>
              <Text>{rowData.prescription}</Text>
            </View>
          }
        />
      )
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No medical history</Text>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    histories: state.main.getIn(['user', 'histories']) !== undefined ? state.main.getIn(['user', 'histories']).toJS() : []
  }
}

export const HistoryContainer = connect(
  mapStateToProps,
  actionCreators
)(History)

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
