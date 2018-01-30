import { combineReducers } from 'redux';
import navigation from './routes/reducer';
import feed from './modules/feed/redux';
import login from './modules/login/redux';
import profile from './modules/profile/redux';
import record from './modules/record/redux';

export default combineReducers({
  feed,
  login,
  navigation,
  profile,
  record,
});
