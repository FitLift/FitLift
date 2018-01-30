const initialState = {
  counter: 0,
};

const REQUEST = 'record';
const REQUEST2 = 'login';


export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
    case REQUEST2:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};
