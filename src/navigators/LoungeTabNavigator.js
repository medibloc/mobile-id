import React from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actionCreators from '../action_creators'
import {ProfileContainer} from '../components/Profile'
import {HistoryContainer} from '../components/History'
import {PatientsContainer} from '../components/Patients'
import {MenuContainer} from '../components/Menu'

import { TabNavigator } from "react-navigation";

export const LoungeTabNavigator = TabNavigator({
  Profile: { screen: ProfileContainer },
  History: { screen: HistoryContainer },
  Patients: { screen: PatientsContainer },
  Menu: { screen: MenuContainer },
})

const LoungeWithNavigationState = ({ dispatch, nav }) => (
  <LoungeTabNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

LoungeWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.tabNav,
});

export default connect(mapStateToProps)(LoungeWithNavigationState);
