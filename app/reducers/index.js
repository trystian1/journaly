import {combineReducers} from 'redux';
import user from './loginReducer';
import entry from './entryReducer';
import entries from './entriesReducer';
import journey from './journeyReducer'
import journeys from './journeysReducer'

const rootReducer = combineReducers({
  user,
  entry,
  entries,
  journey,
  journeys
});

export default rootReducer;
