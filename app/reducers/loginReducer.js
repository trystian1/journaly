import * as types from '../actions/actionTypes';

export default function loginReducer(state = {}, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        displayName: action.data.displayName,
        email: action.data.email,
        uid: action.data.uid,
        loginErrors: null,
        registerErrors: null
      });

    case types.LOGIN_FAILED:

        return Object.assign({}, state, {
          loginErrors: action.error.message
        });

    case types.REGISTER_FAILED:
    
        return Object.assign({}, state, {
          registerErrors: action.error.message
        })

    case types.SINGED_OUT:
    case types.NOT_AUTHENTICATED:
      return Object.assign({}, state, {
        displayName: null,
        email: null,
        uid: null,
        loginErrors: null,
        registerErrors: null
      });


    default:
      return state;
  }


}
