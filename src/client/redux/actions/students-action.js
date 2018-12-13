export const STUDENTS_LIST_TYPES = {
  SHOW_STUDENTS_LIST_START: 'SHOW_STUDENTS_LIST_START',
  SHOW_STUDENTS_LIST_SUCCESS: 'SHOW_STUDENTS_LIST_SUCCESS',
  SHOW_STUDENTS_LIST_ERROR: 'SHOW_STUDENTS_LIST_ERROR'
};

export const showStudentsListStartAC = () => ({
  type: STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_START
});

export const showStudentsListSuccessAC = students => ({
  type: STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_SUCCESS,
  payload: {
    students
  }
});

export const showStudentsListErrorAC = () => ({
  type: STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_ERROR
});
