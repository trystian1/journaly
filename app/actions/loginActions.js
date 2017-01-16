import * as types from './actionTypes';

export const login = (data) => {
  return function(dispatch) {

    return firebase.auth().signInWithEmailAndPassword(data.username, data.password)
      .then(function(user) {
        let userObject = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }
        dispatch(loginSucces(userObject));
      }, function(error) {
        dispatch(loginFailed(error));
      });
  }
};

export const logout = (data) => {
  return function(dispatch) {
    return firebase.auth().signOut().then(function() {
      dispatch(logoutSucces());
    });
  }
}

export const authenticate = (data) => {

  return function(dispatch) {

    let user = firebase.auth().currentUser;

    if (user) {

      let userObject = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      }
      dispatch(loginSucces(userObject));
    } else {
      dispatch(notAuthenticated());
    }
  }
};

export const register = (data) => {

  return function(dispatch) {

    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(function(user) {
        user.updateProfile({
          displayName: data.username
        }).then(function() {

          let userObject = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid
          }
          dispatch(loginSucces(userObject))
        });

      }, function(error) {
        dispatch(registerFailed(error));
      })

  }

}

export const loginSucces = (data) => {
  return {type: types.LOGIN_SUCCESS, data}
}

export const logoutSucces = (data) => {
  return {type: types.SINGED_OUT};
}

export const loginFailed = (error) => {
  return {type: types.LOGIN_FAILED, error};
}

export const registerFailed = (error) => {
  return {type: types.REGISTER_FAILED, error};
}

export const notAuthenticated = (data) => {
  return {type: types.NOT_AUTHENTICATED, data};
}
