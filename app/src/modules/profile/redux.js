const initialState = {};

export const TypeKeys = {
  DISPLAY_EXERCISE_DAY: 'DISPLAY_EXERCISE_DAY',
  LOGOUT: 'LOGOUT',
};

// actions

export const displayExerciseDay = (user, day) => ({
  day,
  type: TypeKeys.DISPLAY_EXERCISE_DAY,
  user,
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
