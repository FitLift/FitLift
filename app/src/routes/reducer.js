import { NavigationActions } from 'react-navigation';
import { Navigation } from './index';

const firstAction = Navigation.router.getActionForPathAndParams('Login');
const tempNavState = Navigation.router.getStateForAction(firstAction);
const initialState = Navigation.router.getStateForAction(
  NavigationActions.init({ routeName: 'Login' }),
  tempNavState,
);

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Login':
      return Navigation.router.getStateForAction(
        NavigationActions.reset({
          actions: [
            NavigationActions.navigate({ routeName: 'LoggedIn' }),
          ],
          index: 0,
        }),
        state,
      );
    case 'Logout':
      return Navigation.router.getStateForAction(
        NavigationActions.reset({
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
          index: 0,
        }),
        state,
      );
    default:
      return Navigation.router.getStateForAction(action, state);
  }
};
