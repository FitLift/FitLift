import { NavigationActions } from 'react-navigation';
import { Navigation } from './index';

const firstAction = Navigation.router.getActionForPathAndParams('login');
const tempNavState = Navigation.router.getStateForAction(firstAction);
const initialState = Navigation.router.getStateForAction(
  NavigationActions.init({ routeName: 'login' }),
  tempNavState,
);

export default (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return Navigation.router.getStateForAction(
        NavigationActions.reset({
          actions: [
            NavigationActions.navigate({ routeName: 'loggedIn' }),
          ],
          index: 0,
        }),
        state,
      );
    case 'logout':
      return initialState;
    default:
      return Navigation.router.getStateForAction(action, state);
  }
};
