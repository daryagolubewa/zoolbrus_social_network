import { PROFILE_TYPES } from '../actions/profile-actions';

const initialState = {
  name: {},
  discription: {},
  work: {},
  links: {}
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_TYPES.CHANGE_AVATAR:
      return { ...state, name: 'hi' };
    case PROFILE_TYPES.CHANGE_WORK:
      return { ...state, discription: 'bye' };
    case PROFILE_TYPES.CHANGE_LINKS:
      return { ...state, work: 'bye' };
    case PROFILE_TYPES.CHANGE_DISCRIPTION:
      return { ...state, links: 'bye' };
    default:
      return state;
  }
}
