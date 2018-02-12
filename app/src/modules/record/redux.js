import { TypeKeys as api } from '../../api/newExercises';

export const initialState = {
  isLoading: false,
  modifiedExercises: {},
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

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return {
        ...state,
        isLoading: false,
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
