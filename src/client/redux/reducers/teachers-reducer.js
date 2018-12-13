import { TEACHERS_LIST_TYPES } from '../actions/teachers-action';

const initialState = {
  teachers: []
};

export default function teachersListReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_START: {
      return { ...state };
    }
    case TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_SUCCESS: {
      return {
        teachers: payload.teachers
      };
    }
    case TEACHERS_LIST_TYPES.SHOW_TEACHERS_LIST_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
}
