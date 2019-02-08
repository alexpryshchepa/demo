import TEST from '../constants';

const initialState = {};

export default function test(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
      };
    default:
      return state;
  }
}
