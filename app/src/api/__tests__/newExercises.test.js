import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { API_URL } from '../../../config';
import { new_exercises as newExercises } from '../db.json';
import reducer, {
  TypeKeys,
  fetchNewExercises,
} from '../newExercises';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async action creator tests', () => {
  it('should fetch current exercises', () => {
    nock(API_URL)
      .get('/new_exercises')
      .reply(200, newExercises);

    const store = mockStore();
    return store.dispatch(fetchNewExercises(5))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});


describe('reducer tests', () => {
  it('TypeKeys.RECEIVE_CURRENT_EXERCISES should work', () => {
    expect(reducer(
      {},
      {
        data: newExercises,
        type: TypeKeys.RECEIVE_NEW_EXERCISES,
      },
    )).toEqual(newExercises);
  });
});
