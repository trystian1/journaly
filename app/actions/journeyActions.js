import * as types from './actionTypes';
import idb from 'idb';

var openDataBase = function() {

  return idb.open('recentData', 1, function(upgradeDb) {

    var store = upgradeDb.createObjectStore('journeys', {
      keyPath: 'id',
      autoIncrement: true
    });

    store.createIndex('by-id', 'id');

  });

}

export function saveJourneySucces(data)  {
  return {type: types.SAVE_JOURNEY_SUCCESS, data};
}

export function getJourneysSucces(data)  {
  return {type: types.GET_JOURNEYS_SUCCESS, data};
}

export function getJourneySucces(data) {
  return {type: types.GET_JOURNEY_SUCCESS, data};
}

export const createJourney = (data) => {
  return function(dispatch) {

    let id = new Date().valueOf();
    return firebase.database().ref('journey/' + id).set({
      id: id,
      userId: data.user.uid,
      userData: {
        userUid: data.user.uid,
        createdBy: data.user.displayName
      },
      journeyData: data.journey
    }).then(value => {
      data.id = id;
      dispatch(saveJourneySucces(data));
    })

  }
};

export const getJourneys = (data) => {
  return function(dispatch) {
    return firebase.database().ref('journey/').once('value').then(snapshot => {
      setRecentJourneys(snapshot.val());
      dispatch(getJourneysSucces(snapshot.val()));
    })

  }
};

export const getRecentJourneys = (data) => {
  return function(dispatch) {
    openDataBase().then(function(db) {
      var index = db.transaction('journeys')
        .objectStore('journeys').index('by-id');

      return index.getAll().then(function(recentJourneys) {
        dispatch(getJourneysSucces(recentJourneys.reverse()));
      });
    });
  }

};

export const setRecentJourneys = (data) => {

  openDataBase().then(function(db) {
    if (!db) return;
    var tx = db.transaction('journeys', 'readwrite'),
        store = tx.objectStore('journeys');


    Object.keys(data).map((key, i) => {
      store.put(data[key]);
    });

    store.index('by-id').openCursor(null, "prev").then(function(cursor) {
      if (!cursor) return;
      return cursor.advance(30);
    }).then(function deleteRest(cursor) {
      if (!cursor) return;
      cursor.delete();
      return cursor.continue().then(deleteRest);
    });

  });

}

export const getRecentJourney = (journeyId) => {
  return function(dispatch) {
    openDataBase().then(function(db) {
      var index = db.transaction('journeys')
        .objectStore('journeys').index('by-id');

      return index.get(parseInt(journeyId)).then(function(recentJourney) {
        dispatch(getJourneySucces(recentJourney));
      });
    });
  }
}

export const getJourney = (data) => {
  return function(dispatch) {
    let id = new Date().valueOf();

    return firebase.database().ref('journey/' + data).once('value').then(snapshot => {
      dispatch(getJourneySucces(snapshot.val()));
    });

  }
};

export function saveEntrySuccess(data)  {
  return {type: types.SAVE_ENTRY_SUCCESS, data};
}
