import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes.jsx';
import css from './styles/style.scss';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
