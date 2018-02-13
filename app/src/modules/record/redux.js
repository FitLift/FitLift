import { createSelector } from 'reselect';
import { TypeKeys as api } from '../../api/newExercises';

export const initialState = {
  isLoading: false,
  modifiedExercises: [],
};

export const TypeKeys = {
  LOGIN: 'login',
  RECEIVE_NEW_EXERCISES: api.RECEIVE_NEW_EXERCISES,
  UPDATE_NEW_EXERCISE: 'UPDATE_NEW_EXERCISE',
};

// actions

export const updateNewExercise = (index, key, value) => ({
  index,
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
  (newExercises, modifiedExercises) => newExercises.map((x, i) => ({
    ...x,
    ...modifiedExercises[i],
  })),
);

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return {
        isLoading: false,
        modifiedExercises: action.data.map(({ reps }) => ({
          reps,
        })),
      };
    case TypeKeys.UPDATE_NEW_EXERCISE:
      return {
        ...state,
        modifiedExercises: {
          ...state.modifiedExercises,
          [action.index]: {
            ...state.modifiedExercises[action.index],
            [action.key]: action.value,
          },
        },
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
