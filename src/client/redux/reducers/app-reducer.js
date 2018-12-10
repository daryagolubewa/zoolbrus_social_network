import { APP_TYPES } from '../actions/app-actions';

const appReducerInitState = {
};

export default function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case APP_TYPES.SAY_HI:
      return { ...state, say: 'hi' };
    case APP_TYPES.SAY_BYE:
      return { ...state, say: 'bye' };
    default:
      return state;
  }
}
