import fetch from 'cross-fetch';

export const initialState = {
  currentExercises: [],
  data: undefined,
  isLoading: false,
};

export const TypeKeys = {
  LOGIN: 'login',
  NAVIGATION: 'Navigation/NAVIGATE',
  RECEIVE_CURRENT_EXERCISES: 'RECEIVE_CURRENT_EXERCISES',
  REQUEST_CURRENT_EXERCISES: 'REQUEST_CURRENT_EXERCISES',
};

// actions

const requestCurrentExercises = user => ({
  type: TypeKeys.REQUEST_CURRENT_EXERCISES,
  user,
});

const receiveCurrentExercises = (user, json) => ({
  CurrentExercises: json.data,
  type: TypeKeys.RECEIVE_CURRENT_EXERCISES,
  user,
});

export const fetchCurrentExercises = user => (dispatch) => {
  dispatch(requestCurrentExercises(user));
  return fetch(`https://www.fitlift_api.com/${user}.json`)
    .then(
      response => response.json(),
      error => `An error occurred: ${error}`,
    )
    .then(json => dispatch(receiveCurrentExercises(user, json)));
};

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_CURRENT_EXERCISES:
      return {
        ...state,
        isLoading: false,
      };
    case TypeKeys.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case TypeKeys.NAVIGATION:
      if (action.routeName === 'record') {
        return {
          ...state,
          counter: state.counter + 1,
        };
      }
      return state;
    default:
      return state;
  }
};
