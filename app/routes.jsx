import React from 'react';
import {Route, browserHistory, IndexRoute} from 'react-router';

import Home from './components/home/homeComponent.jsx';
import App from './components/appComponent.jsx';
import Journeys from './components/journeys/journeysComponent.jsx';
import Journey from './components/journeys/journeyDetailsComponent.jsx';
import CreateJourney from './components/create-journey/createJourneyComponent.jsx';
import About from './components/aboutComponent.jsx';
import CreateEntry from './components/entries/CreateEntryComponent.jsx';

function scrollTop(nextState, replace) {
   window.scrollTo(0, 0)
}

export default (
  <Route component={App}>
      <Route path="/home" component={Home} onEnter={scrollTop}/>
      <Route path="/journeys" component={Journeys} onEnter={scrollTop}/>
      <Route path="/journey/:id" component={Journey} onEnter={scrollTop}/>
      <Route path="/create-journey" component={CreateJourney} onEnter={scrollTop}/>
      <Route path="/create-entry" component={CreateEntry} onEnter={scrollTop}/>
      <Route path="*" component={Home} onEnter={scrollTop} />
  </Route>
);
