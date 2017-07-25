import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

import AppReducer from './src/reducer'
import AppWithNavigationState from './src/navigators/AppNavigator'

const middleware = () => {
  return applyMiddleware(logger)
}

export default class App extends React.Component {
  store = createStore(AppReducer, middleware())

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
