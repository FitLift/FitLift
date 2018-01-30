import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.reset({
    actions: [
      NavigationActions.navigate({ routeName: 'LoggedIn' }),
    ],
    index: 0,
  }),
  tempNavState,
);

export default (state = initialNavState, action) => {
  switch (action.type) {
    case 'Login':
      return AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          actions: [
            NavigationActions.navigate({ routeName: 'LoggedIn' }),
          ],
          index: 0,
        }),
        state,
      );
    case 'Logout':
      return AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
          index: 0,
        }),
        state,
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
