import { STUDENTS_LIST_TYPES } from '../actions/students-action';

const initialState = {
  students: []
};

export default function studentsListReducer(state = initialState, { type, payload }) {
  switch (type) {
    case STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_START: {
      return { ...state };
    }
    case STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_SUCCESS: {
      return {
        students: payload.students
      };
    }
    case STUDENTS_LIST_TYPES.SHOW_STUDENTS_LIST_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
}
