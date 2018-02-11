import { TypeKeys as api } from '../../api/newExercises';

export const initialState = {
  isLoading: false,
};

export const TypeKeys = {
  LOGIN: 'login',
  RECEIVE_NEW_EXERCISES: api.RECEIVE_NEW_EXERCISES,
};

// actions

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.RECEIVE_NEW_EXERCISES:
      return {
        ...state,
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
