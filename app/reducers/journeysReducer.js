import * as types from '../actions/actionTypes';

export default function journeyReducer(state = {}, action) {
  switch(action.type) {
    case types.GET_JOURNEYS_SUCCESS:
      let journeys = action.data;

      return Object.assign({}, state, {
        data: journeys
      });

    default:
      return state;

  }


}
