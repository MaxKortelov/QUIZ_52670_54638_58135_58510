import { combineReducers } from 'redux';
import { currentUser } from './user';
import { quiz } from './quiz';
import { submit } from 'store/submit';

export const rootReducer = combineReducers({
  currentUser,
  quiz,
  submit,
});
