import * as types from '../actions/actionTypes';

export default function entriesReducer(state = {}, action) {
  switch(action.type) {
    case types.GET_ENTRIES_SUCCESS:
      let entries = action.data;

      return Object.assign({}, state, {
        data: entries
      });

    default:
      return state;

  }


}
