export const USER_TYPES = {
  FETCH_USER_START: 'FETCH_USER_START',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR: 'FETCH_USER_ERROR'
};

export const fetchUserStartAC = () => ({ type: USER_TYPES.FETCH_USER_START });

export const fetchUserSuccessAC = user => ({
  type: USER_TYPES.FETCH_USER_SUCCESS,
  payload: {
    user
  }
});

export const fetchUserErrorAC = () => ({ type: USER_TYPES.FETCH_USER_ERROR });
