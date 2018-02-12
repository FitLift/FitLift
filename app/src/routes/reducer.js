import { NavigationActions } from 'react-navigation';
import { Navigation } from './index';

// const initialState =
//   Navigation.router.getStateForAction(
//     Navigation.router.getActionForPathAndParams('login'),
//   );

const initialState =
  Navigation.router.getStateForAction(
    NavigationActions.reset({
      actions: [
        NavigationActions.navigate({ routeName: 'loggedIn' }),
      ],
      index: 0,
    }),
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
