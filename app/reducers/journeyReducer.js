import * as types from '../actions/actionTypes';

export default function journeyReducer(state = {}, action) {
  switch(action.type) {
    case types.SAVE_JOURNEY_SUCCESS:

      return Object.assign({}, state, {
        userData: action.data.user,
        journeyData: action.data.journey,
        id: action.data.id
      });
    case types.GET_JOURNEY_SUCCESS:

      return Object.assign({}, state, {
        userData: action.data.userData,
        journeyData: action.data.journeyData,
        id: action.data.id
      });
    default:
      return state;
  }


}
