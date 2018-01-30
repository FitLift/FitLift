import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import Login from '../modules/Login/App';
import Feed from './Feed';
import Record from './Record';
import Profile from './Profile';

const TabScreenNavigator = TabNavigator({
  ...Feed,
  ...Record,
  ...Profile,
}, {
  animationEnabled: true,
  initialRouteName: 'Record',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fc4c02',
  },
  tabBarPosition: 'bottom',
});

export const Navigation = StackNavigator({
  LoggedIn: { screen: TabScreenNavigator },
  Login: { screen: Login },
});

const mapStateToProps = state => ({
  navigation: state.navigation,
});

class Router extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
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
      navigation,
    } = this.props;
    return (
      <Navigation navigation={addNavigationHelpers({ dispatch, state: navigation })} />
    );
  }
}

export default connect(mapStateToProps)(Router);
