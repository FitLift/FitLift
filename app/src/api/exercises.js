import firebase from './firebase';
const moment = require('moment');

const initialState = {};

export const TypeKeys = {
  RECEIVE_EXERCISES: 'RECEIVE_EXERCISES',
  REQUEST_EXERCISES: 'REQUEST_EXERCISES'
};

const requestExercises = user => ({
  type: TypeKeys.REQUEST_EXERCISES,
  user
});

const receiveExercises = data => ({
  data,
  type: TypeKeys.RECEIVE_EXERCISES
});

export const fetchExercises = day => dispatch => {
  const user = firebase.auth().currentUser.uid;
  dispatch(requestExercises(user));

  const startTime = Number(moment('2018-03-06').format('x'));
  const endTime = startTime + 86400000;
  console.log(startTime);
  console.log(endTime);
  firebase
    .database()
    .ref(`exercises/${user}`)
    .orderByChild('timeStamp')
    .startAt(startTime)
    .endAt(endTime)
    .on('value', data => {
      dispatch(receiveExercises(data.val()));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_EXERCISES:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
