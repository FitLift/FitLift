import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import Feed from '../modules/Feed/App';
import Login from '../modules/Login/App';
import Profile from '../modules/Profile/App';
import Record from '../modules/Record/App';

const TabScreenNavigator = TabNavigator({
  Feed: { screen: Feed },
  Record: { screen: Record },
  Profile: { screen: Profile },
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
  tabBarPosition: 'bottom',
});

export const AppNavigator = StackNavigator({
  Login: { screen: Login },
  LoggedIn: { screen: TabScreenNavigator },
});


class AppWithNavigationState extends PureComponent {
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
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
