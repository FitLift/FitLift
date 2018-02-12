import fetch from 'cross-fetch';
import { API_URL } from '../../config';

const initialState = [];

export const TypeKeys = {
  RECEIVE_NEW_EXERCISES: 'RECEIVE_NEW_EXERCISES',
  REQUEST_NEW_EXERCISES: 'REQUEST_NEW_EXERCISES',
};

const requestNewExercises = user => ({
  type: TypeKeys.REQUEST_NEW_EXERCISES,
  user,
});

const receiveNewExercises = (user, data) => ({
  data,
  type: TypeKeys.RECEIVE_NEW_EXERCISES,
  user,
});

export const fetchNewExercises = user => (dispatch) => {
  dispatch(requestNewExercises(user));
  return fetch(`${API_URL}/new_exercises`)
    .then(
      response => response.json(),
      error => `An error occurred: ${error}`,
    )
    .then(json => dispatch(receiveNewExercises(user, json)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return action.data;
    default:
      return state;
  }
};
