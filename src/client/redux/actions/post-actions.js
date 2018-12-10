import { PAGES } from '../../routes/pages';

export const POST_TYPES = {
  FETCH_POSTS_START: 'FETCH_POSTS_START',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR: 'FETCH_POSTS_ERROR'
};

const fetchPostsStartAC = () => ({
  type: POST_TYPES.FETCH_POSTS_START
});

const fetchPostsSuccessAC = posts => ({
  type: POST_TYPES.FETCH_POSTS_SUCCESS,
  payload: {
    posts
  }
});

const fetchPostsErrorAC = () => ({
  type: POST_TYPES.FETCH_POSTS_ERROR
});

// eslint-disable-next-line
export const fetchPostsThunkAC = () => {
  return async (dispatch, getState) => {
    console.log('state', getState());
    dispatch(fetchPostsStartAC());
    try {
      const posts = await fetch(PAGES.API.fetchPosts.path);
      const postsResult = await posts.json();
      console.log('postsResult', postsResult);
      dispatch(fetchPostsSuccessAC(postsResult));
    } catch (e) {
      console.error(e);
      dispatch(fetchPostsErrorAC());
    }
  };
};
