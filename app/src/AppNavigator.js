import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Feed from './modules/Feed/App';
import Profile from './modules/Profile/App';
import Record from './modules/Record/App';
import Login from './modules/Login/App';


export const AppNavigator = StackNavigator({
  Feed: { screen: Feed },
  Login: { screen: Login },
  Profile: { screen: Profile },
  Record: { screen: Record },
});

class AppWithNavigationState extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        routeName: PropTypes.string,
        type: PropTypes.any,
      })),
    }).isRequired,
  };

  render() {
    const {
      dispatch,
      nav,
    } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
