import fetch from 'cross-fetch';
import firebase from 'firebase';
import omit from 'lodash/omit';
import { API_URL, FIREBASE_URL } from '../../config';

const initialState = {};

const config = {
  apiKey: 'AIzaSyAOFwsIxlQSaONcrlNFKRKDp5W-Ug_QSuY',
  authDomain: 'fitlift-38a0c.firebaseapp.com',
  databaseURL: 'https://fitlift-38a0c.firebaseio.com',
};

firebase.initializeApp(config);

export const TypeKeys = {
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
    .startAt(Date.now() / 1000)
    .on('child_added', (data) => {
      dispatch((receiveNewExercises({
        [data.key]: data.val(),
      })));
    });
};

export const postConfirmedExercise = user => (dispatch) => {
  // make loader action here.
  return fetch(`${FIREBASE_URL}/exercises/${user}.json`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: '-L5GDeJnjbOj1SkQRJK8',
      reps: 5,
      timeStamp: 1518407604,
      type: 'Shoulder Press',
      weight: 15,
    }),
    method: 'POST',
  }).then(
    response => dispatch(removeConfirmedExercise()),
    error => console.log(error),
  );
};

export const deleteNewExercise = (user, exerciseID) => (dispatch) => {
  // make loader action here.
  return fetch(`${FIREBASE_URL}/exercises/${user}.json`, {
    body: JSON.stringify({
      id: exerciseID,
      reps: 5,
      timeStamp: 1518407604,
      type: 'Shoulder Press',
      weight: 15,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(
    response => dispatch(removeConfirmedExercise(exerciseID)),
    error => console.log(error),
  );
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
