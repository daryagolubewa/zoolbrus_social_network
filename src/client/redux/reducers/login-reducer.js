import { LOGIN_TYPES } from '../actions/login-actions';

const initialState = {
  loginUser: {},
  isFetching: false
};

export default function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_TYPES.POST_LOGIN_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case LOGIN_TYPES.POST_LOGIN_SUCCESS: {
      return {
        loginUser: payload.loginUser,
        isFetching: false
      };
    }
    case LOGIN_TYPES.POST_LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
}
