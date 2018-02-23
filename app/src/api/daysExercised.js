import firebase from './firebase';

const initialState = {};

export const TypeKeys = {
  RECEIVE_DAYS_EXERCISED: 'RECEIVE_DAYS_EXERCISED',
  REQUEST_DAYS_EXERCISED: 'REQUEST_DAYS_EXERCISED',
};

const requestDaysExercised = user => ({
  type: TypeKeys.REQUEST_DAYS_EXERCISED,
  user,
});

const receiveDaysExercised = data => ({
  data,
  type: TypeKeys.RECEIVE_DAYS_EXERCISED,
});

export const listenForNewDays = user => (dispatch) => {
  dispatch(requestDaysExercised(user));
  firebase.database()
    .ref(`days_exercised/${user}`)
    .on('child_added', (data) => {
      dispatch(receiveDaysExercised({
        [data.key]: data.val(),
      }));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_DAYS_EXERCISED:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
