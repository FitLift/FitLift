import { combineReducers } from 'redux';
import newExercises from './newExercises';
import daysExercised from './daysExercised';
import exercises from './exercises';

export default combineReducers({
  daysExercised,
  exercises,
  newExercises,
});
