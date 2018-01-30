import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
console.log(tempNavState);
// const initialState = AppNavigator.router.getStateForAction(
//   NavigationActions.reset({
//     actions: [
//       NavigationActions.navigate({ routeName: 'Login' }),
//     ],
//     index: 0,
//   }),
//   tempNavState,
// );
const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.init({ routeName: 'Login' }),
  tempNavState,
);


export default (state = initialState, action) => {
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
