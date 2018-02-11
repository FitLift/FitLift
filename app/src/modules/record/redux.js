import fetch from 'cross-fetch';
import { API_URL } from '../../../config';

export const initialState = {
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

const receiveCurrentExercises = (user, data) => ({
  data,
  type: TypeKeys.RECEIVE_CURRENT_EXERCISES,
  user,
});

export const fetchCurrentExercises = user => (dispatch) => {
  dispatch(requestCurrentExercises(user));
  return fetch(`${API_URL}/currentExercises/${user}`)
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
        data: action.data,
        isLoading: false,
      };
    case TypeKeys.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
