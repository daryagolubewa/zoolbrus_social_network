import { USER_TYPES } from '../actions/user-actions';

const initialState = {
  user: {},
  isFetching: false
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_TYPES.FETCH_USER_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case USER_TYPES.FETCH_USER_SUCCESS: {
      return {
        user: payload.user,
        isFetching: false
      };
    }
    case USER_TYPES.FETCH_USER_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
}
