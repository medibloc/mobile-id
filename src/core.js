import { AsyncStorage } from 'react-native'
import {fromJS} from 'immutable'

export function setProfile(state, profile, balance, isDoctor) {
  const user = state.get('user')
  resultUser = user.set('profile', fromJS(profile))
    .set('balance', balance)
    .set('isDoctor', isDoctor)
  return state.set('user', resultUser)
}

export function setLicenseInfo(state, doctor) {
  const user = state.get('user')
  const intermediateUser = user.set('isDoctor', true)
  const resultUser = intermediateUser.set('doctor', fromJS(doctor))
  return state.set('user', resultUser)
}

export function addPatient(state, email, account, profile) {
  const patients = state.getIn(['doctor', 'patients'])
  let patientsUpdated
  if (patients) {
    patientsUpdated = Array.from(patients)
    patientsUpdated += [{email, account, profile}]
  } else {
    patientsUpdated = [{email, account, profile}]
  }

  AsyncStorage.setItem('@MediBloc:patients', patientsUpdated.toString())

  return state.setIn(['doctor', 'patients'], fromJS(patientsUpdated))
}
