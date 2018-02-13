import reducer, {
  TypeKeys,
  updateNewExercise,
  exercisesToRecordSelector,
} from '../redux';
import { new_exercises as newExercises } from '../../../api/db.json';


describe('selector tests', () => {
  it('it should work', () => {
    expect(exercisesToRecordSelector({
      db: {
        newExercises,
      },
      record: {
        modifiedExercises: [
          {
            reps: 12,
            weight: 35,
          },
          {
            reps: 5,
            weight: 15,
          },
          {
            reps: 6,
            weight: 45,
          },
        ],
      },
    })).toEqual([
      {
        reps: 12,
        timeStamp: 1518407604,
        type: 'Bicep Curls',
        weight: 35,
      },
      {
        reps: 5,
        timeStamp: 1518407604,
        type: 'Shoulder Press',
        weight: 15,
      },
      {
        reps: 6,
        timeStamp: 1518407604,
        type: 'Lateral Raises',
        weight: 45,
      },
    ]);
  });
});

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

  it('TypeKeys.RECEIVE_NEW_EXERCISES should work', () => {
    expect(reducer(
      {
        isLoading: true,
        modifiedExercises: [],
      },
      {
        data: newExercises,
        type: TypeKeys.RECEIVE_NEW_EXERCISES,
      },
    )).toEqual({
      isLoading: false,
      modifiedExercises: [
        {
          reps: 12,
        },
        {
          reps: 5,
        },
        {
          reps: 6,
        },
      ],
    });
  });

  // it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
  //   expect(reducer(
  //     {
  //       isLoading: false,
  //       modifiedExercises: {},
  //     },
  //     updateNewExercise(1, 'weight', 25),
  //   )).toEqual({
  //     isLoading: false,
  //     modifiedExercises: {
  //       1: {
  //         weight: 25,
  //       },
  //     },
  //   });
  // });

  // it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
  //   expect(reducer(
  //     {
  //       isLoading: false,
  //       modifiedExercises: {
  //         1: {
  //           reps: 6,
  //           weight: 25,
  //         },
  //       },
  //     },
  //     updateNewExercise(1, 'reps', 10),
  //   )).toEqual({
  //     isLoading: false,
  //     modifiedExercises: {
  //       1: {
  //         reps: 10,
  //         weight: 25,
  //       },
  //     },
  //   });
  // });

  // it('TypeKeys.UPDATE_NEW_EXERCISE should work', () => {
  //   expect(reducer(
  //     {
  //       isLoading: false,
  //       modifiedExercises: {
  //         1: {
  //           reps: 6,
  //           weight: 25,
  //         },
  //       },
  //     },
  //     updateNewExercise(1, 'reps', 10),
  //   )).toEqual({
  //     isLoading: false,
  //     modifiedExercises: {
  //       1: {
  //         reps: 10,
  //         weight: 25,
  //       },
  //     },
  //   });
  // });

  // it('TypeKeys.RECEIVE_NEW_EXERCISES should work', () => {
  //   expect(reducer(
  //     {
  //       isLoading: true,
  //     },
  //     {
  //       type: TypeKeys.RECEIVE_NEW_EXERCISES,
  //     },
  //   )).toEqual({
  //     isLoading: false,
  //   });
  // });
});
