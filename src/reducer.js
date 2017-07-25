import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { Map, fromJS } from 'immutable'
import { AppNavigator } from './navigators/AppNavigator'
import {LoungeTabNavigator} from './navigators/LoungeTabNavigator'
import { setProfile, setLicenseInfo, addPatient } from './core'

const NAV_BACK = 'Navigation/BACK';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

function appNav(state = initialNavState, action) {
  let nextState

  switch (action.type) {
    case 'SETUP_ACCOUNT':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'AccountSetup'})
          ]
        }),
        state
      )
      break
    case 'CREATE_ACCOUNT':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'CreateAccount'})
          ]
        }),
        state
      )
      break
    case 'RESTORE_ACCOUNT':

      break
    case 'GET_PROFILE':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'GetProfile'})
          ]
        }),
        state
      )
      break
    case 'GO_HOME':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Home'})
          ]
        }),
        state
      )
      break
    case 'GO_LOUNGE':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Lounge'})
          ]
        }),
        state
      )
      break
    case 'GO_BACK':
    case NAV_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      )
      break
    case 'PATIENTS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'Patients'}),
        state
      )
      break
    case 'GET_PATIENT':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'GetPatient'}),
        state
      )
      break
    case 'WRITE_HISTORY':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'WriteHistory'}),
        state
      )
      break
    case 'REGISTER_LICENSE':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'RegisterLicense'}),
        state
      )
      break
    default:
      break
  }

  return nextState || state
}

const NAVIGATE = 'Navigation/NAVIGATE';
const firstTabAction = LoungeTabNavigator.router.getActionForPathAndParams('Profile')
const initialTabNavState = LoungeTabNavigator.router.getStateForAction(firstTabAction)

function tabNav(state = initialTabNavState, action) {
  switch (action.type) {
    case NAVIGATE:
      return LoungeTabNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      )
    default:
      return state
  }
}

const initialMainState = fromJS({sentRequest: false})

function main(state = initialMainState, action) {
  switch (action.type) {
    case 'SENT_REQUEST':
      return state.set('sentRequest', true)
    case 'GOT_RESPONSE':
      return state.set('sentRequest', false)
    case 'SET_ACCOUNT':
      return state.set('user', fromJS({
        email: action.email,
        account: action.account
      }))
    case 'SET_PROFILE':
      return setProfile(state, action.profile, action.balance, action.isDoctor)
    case 'LICENSE_REGISTERED':
      return setLicenseInfo(state, action.doctor)
    case 'SET_PATIENTS':
      return state.setIn(['doctor', 'patients'], fromJS(action.patients))
    case 'ADD_PATIENT':
      return addPatient(state, action.email, action.account, action.profile)
    case 'WRITE_HISTORY':
      return state.setIn(['doctor', 'historyWriting'], fromJS({
        email: action.email,
        account: action.account,
        profile: action.profile
      }))
    case 'SET_HISTORIES':
      return state.setIn(['user', 'histories'], fromJS(action.histories))
    default:
      return state
  }
}

const AppReducer = combineReducers({
  appNav,
  tabNav,
  main,
})

export default AppReducer
