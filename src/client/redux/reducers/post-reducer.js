import { POST_TYPES } from '../actions/post-actions';

const initialState = {
  posts: [],
  isFetching: false
};

export default function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    case POST_TYPES.FETCH_POSTS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case POST_TYPES.FETCH_POSTS_SUCCESS: {
      return {
        posts: payload.posts,
        isFetching: false
      };
    }
    case POST_TYPES.FETCH_POSTS_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
}
