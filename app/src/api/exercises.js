import firebase from './firebase';

const initialState = {};

export const TypeKeys = {
  RECEIVE_EXERCISES: 'RECEIVE_EXERCISES',
  REQUEST_EXERCISES: 'REQUEST_EXERCISES',
};

const requestExercises = user => ({
  type: TypeKeys.REQUEST_EXERCISES,
  user,
});

const receiveExercises = data => ({
  data,
  type: TypeKeys.RECEIVE_EXERCISES,
});

export const fetchExercises = (user, day) => (dispatch) => {
  dispatch(requestExercises(user));
  const startTime = new Date(day).getTime();
  const endTime = new Date(day).getTime() + 86400000;
  firebase.database()
    .ref(`exercises/${user}`)
    .orderByChild('timeStamp')
    .startAt(startTime)
    .endAt(endTime)
    .once('value', (data) => {
      dispatch(receiveExercises(data.val()));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_EXERCISES:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
