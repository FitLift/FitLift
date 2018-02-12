import reducer, {
  TypeKeys,
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
