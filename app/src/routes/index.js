import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import login from '../modules/login/App';
import feed from './feed';
import record from './record';
import profile from './profile';

export const tabScreenNavigator = TabNavigator({
  ...feed,
  ...record,
  ...profile,
}, {
  animationEnabled: true,
  initialRouteName: 'record',
  paths: {
    record: 'feed',
  },
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fc4c02',
  },
  tabBarPosition: 'bottom',
});

export const Navigation = StackNavigator({
  loggedIn: { screen: tabScreenNavigator },
  login: { screen: login },
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
