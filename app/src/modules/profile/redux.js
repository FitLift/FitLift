import { createSelector } from 'reselect';
import reverse from 'lodash/reverse';

const initialState = {};

export const TypeKeys = {
  DISPLAY_EXERCISE_DAY: 'DISPLAY_EXERCISE_DAY',
  LOGOUT: 'LOGOUT'
};

// selectors

const daysExercisedSelector = state => state.db.daysExercised;

export const daysExercisedArraySelector = createSelector(
  daysExercisedSelector,
  daysExercised => {
    if (Object.keys(daysExercised).length !== 0) {
      return reverse(Object.keys(daysExercised).map(x => x));
    }
    return null;
  }
);

// actions

export const displayExerciseDay = (user, day) => ({
  day,
  type: TypeKeys.DISPLAY_EXERCISE_DAY,
  user
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
