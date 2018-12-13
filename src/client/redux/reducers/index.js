import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user-reducer';
import loginReducer from './login-reducer';
import teachersListReducer from './teachers-reducer';
import studentsListReducer from './students-reducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  teachers: teachersListReducer,
  students: studentsListReducer,
  login: loginReducer
});

export default reducers;
