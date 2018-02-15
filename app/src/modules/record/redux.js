import { createSelector } from 'reselect';
import omit from 'lodash/omit';
import { TypeKeys as api } from '../../api/newExercises';

export const initialState = {
  isLoading: false,
  modifiedExercises: {},
};

export const TypeKeys = {
  LOGIN: 'login',
  POST_NEW_EXERCISE: api.POST_NEW_EXERCISE,
  RECEIVE_NEW_EXERCISES: api.RECEIVE_NEW_EXERCISES,
  REMOVE_NEW_EXERCISE: api.REMOVE_NEW_EXERCISE,
  UPDATE_NEW_EXERCISE: 'UPDATE_NEW_EXERCISE',
};

// actions

export const updateNewExercise = (id, key, value) => ({
  id,
  key,
  type: TypeKeys.UPDATE_NEW_EXERCISE,
  value,
});

// selectors

const newExercisesSelector = state => state.db.newExercises;
const modifiedExercisesSelector = state => state.record.modifiedExercises;

export const exercisesToRecordSelector = createSelector(
  newExercisesSelector,
  modifiedExercisesSelector,
  (newExercises, modifiedExercises) => Object.keys(newExercises).map(x => ({
    ...newExercises[x],
    id: x,
    ...modifiedExercises[x],
  })),
);

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return {
        isLoading: false,
        modifiedExercises: {
          ...state.modifiedExercises,
          ...Object.keys(action.data).reduce((acc, x) => ({
            ...acc,
            [x]: {
              reps: action.data[x].reps,
            },
          }), {}),
        },
      };
    case TypeKeys.UPDATE_NEW_EXERCISE: {
      const {
        id,
        key,
        value,
      } = action;
      return {
        ...state,
        modifiedExercises: {
          ...state.modifiedExercises,
          [id]: {
            ...state.modifiedExercises[id],
            [key]: value,
          },
        },
      };
    }
    case TypeKeys.REMOVE_NEW_EXERCISE:
      return {
        ...state,
        modifiedExercises: omit(state.modifiedExercises, action.id),
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
