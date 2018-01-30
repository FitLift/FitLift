import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import reducer, {
  TypeKeys,
  fetchCurrentExercises,
} from '../redux';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('action creator tests', () => {
  it('should fetch reddit slime', () => {
    nock('https://www.fitlift_api.com')
      .get('/5.json')
      .reply(200, {
        data: {
          CurrentExercises: [
            {
              reps: 12,
              sets: 2,
              type: 'Bicep Curls',
            },
            {
              reps: 1,
              sets: 9,
              type: 'Shoulder Press',
            },
            {
              reps: 6,
              sets: 4,
              type: 'Lateral Raises',
            },
          ],
        },
      });

    const store = mockStore();
    return store.dispatch(fetchCurrentExercises(5))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
      });
  });
});


describe('reducer tests', () => {
  it('TypeKeys.LOGIN should work', () => {
    expect(reducer(
      {
        data: undefined,
        isLoading: false,
      },
      {
        type: TypeKeys.LOGIN,
      },
    )).toEqual({
      data: undefined,
      isLoading: true,
    });
  });

  it('TypeKeys.RECEIVE_CURRENT_EXERCISES should work', () => {
    expect(reducer(
      {
        data: undefined,
        isLoading: false,
      },
      {
        type: TypeKeys.RECEIVE_CURRENT_EXERCISES,
      },
    )).toEqual({
      data: undefined,
      isLoading: false,
    });
  });
});
