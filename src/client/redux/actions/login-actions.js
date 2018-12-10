export const LOGIN_TYPES = {
  POST_LOGIN_START: 'POST_LOGIN_START',
  POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS',
  POST_LOGIN_ERROR: 'POST_LOGIN_ERROR'
};

export const postLoginStartAC = () => ({
  type: LOGIN_TYPES.POST_LOGIN_START
});

export const postLoginSuccessAC = loginUser => ({
  type: LOGIN_TYPES.POST_LOGIN_SUCCESS,
  payload: {
    loginUser
  }
});

export const postLoginErrorAC = () => ({
  type: LOGIN_TYPES.POST_LOGIN_ERROR
});
