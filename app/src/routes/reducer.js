import { NavigationActions } from 'react-navigation';
import { Navigation } from './index';

// const initialState =
//   Navigation.router.getStateForAction(
//     Navigation.router.getActionForPathAndParams('login'),
//   );

const initialState = Navigation.router.getStateForAction(
  NavigationActions.navigate({ routeName: 'loggedIn' })
);

export default (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return Navigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'loggedIn' })
      );
    case 'logout':
      return Navigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login' })
      );
    case 'DISPLAY_EXERCISE_DAY':
      return Navigation.router.getStateForAction(
        NavigationActions.navigate({
          params: {
            day: action.day,
            user: action.user
          },
          routeName: 'exerciseDay'
        }),
        Navigation.router.getStateForAction(action, state)
      );
    default:
      return Navigation.router.getStateForAction(action, state);
  }
};
