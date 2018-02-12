import reducer, {
  TypeKeys,
  updateNewExercise
} from '../redux';

describe('reducer tests', () => {
  it('TypeKeys.LOGIN should work', () => {
    expect(reducer(
      {
        isLoading: false,
      },
      {
        type: TypeKeys.LOGIN,
      },
    )).toEqual({
      isLoading: true,
    });
  });

  it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
    expect(reducer(
      {
        isLoading: false,
        modifiedExercises: {},
      },
      updateNewExercise(1, 'weight', 25),
    )).toEqual({
      isLoading: false,
      modifiedExercises: {
        1: {
          weight: 25,
        },
      },
    });
  });

  it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
    expect(reducer(
      {
        isLoading: false,
        modifiedExercises: {
          1: {
            reps: 6,
            weight: 25,
          },
        },
      },
      updateNewExercise(1, 'reps', 10),
    )).toEqual({
      isLoading: false,
      modifiedExercises: {
        1: {
          reps: 10,
          weight: 25,
        },
      },
    });
  });

  it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
    expect(reducer(
      {
        isLoading: false,
        modifiedExercises: {
          1: {
            reps: 6,
            weight: 25,
          },
        },
      },
      updateNewExercise(1, 'reps', 10),
    )).toEqual({
      isLoading: false,
      modifiedExercises: {
        1: {
          reps: 10,
          weight: 25,
        },
      },
    });
  });

  it('TypeKeys.RECEIVE_NEW_EXERCISES should work', () => {
    expect(reducer(
      {
        isLoading: true,
      },
      {
        type: TypeKeys.RECEIVE_NEW_EXERCISES,
      },
    )).toEqual({
      isLoading: false,
    });
  });
});
