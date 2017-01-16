import * as types from './actionTypes';
import idb from 'idb';

export function saveEntrySuccess(data)  {
  return {type: types.SAVE_ENTRY_SUCCESS, data};
}

export function getEntriesSucces(data) {
  return {type: types.GET_ENTRIES_SUCCESS, data};
}

export const saveEntry = (data) => {
  return function(dispatch) {

    let id = new Date().valueOf();

    return firebase.database().ref('journey/' + data.journeyId + '/entry/' + id).set({
      data
    }).then(value => {

      dispatch(saveEntrySuccess(data));
    })

  }
};

export const getEntries = (journeyId) => {
  return function(dispatch) {
    return firebase.database().ref('journey/' + journeyId + '/entry/').once('value').then(snapshot => {
      setRecentEntries(snapshot.val());
      dispatch(getEntriesSucces(snapshot.val()))
    });

  }
};
