import React from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {HomeContainer} from '../components/Home';
import {AccountSetupContainer} from '../components/AccountSetup'
import {CreateAccountContainer} from '../components/CreateAccount'
import {GetProfileContainer} from '../components/GetProfile'
import LoungeTabNavigator from './LoungeTabNavigator'
import {ProfileContainer} from '../components/Profile'
import {HistoryContainer} from '../components/History'
import {MenuContainer} from '../components/Menu'
import {RegisterLicenseContainer} from '../components/RegisterLicense'
import {GetPatientContainer} from '../components/GetPatient'
import {PatientsContainer} from '../components/Patients'
import {WriteHistoryContainer} from '../components/WriteHistory'

export const AppNavigator = StackNavigator({
  Home: { screen: HomeContainer },
  AccountSetup: { screen: AccountSetupContainer },
  CreateAccount: { screen: CreateAccountContainer },
  GetProfile: { screen: GetProfileContainer },
  Lounge: { screen: LoungeTabNavigator },
  Profile: { screen: ProfileContainer },
  History: { screen: HistoryContainer },
  Menu: { screen: MenuContainer },
  RegisterLicense: { screen: RegisterLicenseContainer },
  GetPatient: { screen: GetPatientContainer },
  Patients: { screen: PatientsContainer },
  WriteHistory: { screen: WriteHistoryContainer },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.appNav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
