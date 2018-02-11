import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import reducer, {
  TypeKeys,
  fetchCurrentExercises,
} from '../redux';
import { mapStateToProps } from '../App';
import { API_URL } from '../../../../config';
import { currentExercises } from '../../../api/db.json';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async action creator tests', () => {
  it('should fetch current exercises', () => {
    nock(API_URL)
      .get('/currentExercises/5')
      .reply(200, currentExercises);

    const store = mockStore();
    return store.dispatch(fetchCurrentExercises(5))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
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
        isLoading: true,
      },
      {
        data: currentExercises,
        type: TypeKeys.RECEIVE_CURRENT_EXERCISES,
      },
    )).toEqual({
      data: currentExercises,
      isLoading: false,
    });
  });
});

describe('mapStateToProps tests', () => {
  it('should work', () => {
    expect(mapStateToProps({
      record: {
        data: undefined,
        isLoading: false,
      },
    })).toEqual({
      record: {
        data: undefined,
        isLoading: false,
      },
    });
  });
});
