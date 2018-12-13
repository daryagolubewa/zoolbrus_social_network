export const TEACHERS_LIST_TYPES = {
  SHOW_TEACHERS_LIST_START: 'SHOW_TEACHERS_LIST_START',
  SHOW_TEACHERS_LIST_SUCCESS: 'SHOW_TEACHERS_LIST_SUCCESS',
  SHOW_TEACHERS_LIST_ERROR: 'SHOW_TEACHERS_LIST_ERROR'
};

export const showTeachersListStartAC = () => ({
  type: TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_START
});

export const showTeachersListSuccessAC = teachers => ({
  type: TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_SUCCESS,
  payload: {
    teachers
  }
});

export const showTeachersListErrorAC = () => ({
  type: TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_ERROR
});
