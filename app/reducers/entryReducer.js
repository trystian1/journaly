import * as types from '../actions/actionTypes';

export default function entryReducer(state = {}, action) {
  switch(action.type) {
    case types.SAVE_ENTRY_SUCCESS:
      return Object.assign({}, state, {
        entryData: action.data
      });
    default:
      return state;
  }


}
