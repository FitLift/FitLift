import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Feed from './modules/Feed/App';
import Profile from './modules/Profile/App';
import Record from './modules/Record/App';
import Login from './modules/Login/App';


export const AppNavigator = StackNavigator({
  Record: { screen: Record },
  Login: { screen: Profile },
  Login: { screen: Login },
  Feed: { screen: Feed },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

