import fetch from 'cross-fetch';
import firebase from 'firebase';
import omit from 'lodash/omit';
import { FIREBASE_URL } from '../../config';

const initialState = {};

const config = {
  apiKey: 'AIzaSyAOFwsIxlQSaONcrlNFKRKDp5W-Ug_QSuY',
  authDomain: 'fitlift-38a0c.firebaseapp.com',
  databaseURL: 'https://fitlift-38a0c.firebaseio.com',
};

firebase.initializeApp(config);

export const TypeKeys = {
  CONFIRMING_NEW_EXERCISE: 'CONFIRMING_NEW_EXERCISE',
  RECEIVE_NEW_EXERCISES: 'RECEIVE_NEW_EXERCISES',
  REMOVE_NEW_EXERCISE: 'REMOVE_NEW_EXERCISE',
  REQUEST_NEW_EXERCISES: 'REQUEST_NEW_EXERCISES',
};

const requestNewExercises = user => ({
  type: TypeKeys.REQUEST_NEW_EXERCISES,
  user,
});

const receiveNewExercises = data => ({
  data,
  type: TypeKeys.RECEIVE_NEW_EXERCISES,
});

const removeConfirmedExercise = id => ({
  id,
  type: TypeKeys.REMOVE_NEW_EXERCISE,
});

const confirmingNewExercise = id => ({
  id,
  type: TypeKeys.CONFIRMING_NEW_EXERCISE,
});

export const createNewExercise = (type, reps) => () =>
  fetch(`${FIREBASE_URL}/new_exercises/SAMPLE_USER.json`, {
    body: JSON.stringify({
      reps,
      timeStamp: Date.now(),
      type,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

export const fetchNewExercises = user => (dispatch) => {
  dispatch(requestNewExercises(user));
  return fetch(`${FIREBASE_URL}/new_exercises/${user}.json`)
    .then(
      response => response.json(),
      error => `An error occurred: ${error}`,
    )
    .then(json => dispatch(receiveNewExercises(json)));
};

export const listenForNewExercises = user => (dispatch) => {
  firebase.database()
    .ref(`new_exercises/${user}`)
    .orderByChild('timeStamp')
    .startAt(Date.now())
    .on('child_added', (data) => {
      dispatch((receiveNewExercises({
        [data.key]: data.val(),
      })));
    });
};

export const deleteNewExercise = ({
  user,
  timeStamp,
  id,
  type,
  reps,
  weight,
}) => (dispatch) => {
  dispatch(confirmingNewExercise(id));
  return Promise.all(fetch(`${FIREBASE_URL}/exercises/${user}.json`, {
    body: JSON.stringify({
      reps,
      timeStamp,
      type,
      weight,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }),
  firebase.database()
    .ref(`new_exercises/${user}/${id}`)
    .remove())
    .then(() => dispatch(removeConfirmedExercise(id)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return {
        ...state,
        ...action.data,
      };
    case TypeKeys.REMOVE_NEW_EXERCISE:
      return omit(state, action.id);
    default:
      return state;
  }
};
