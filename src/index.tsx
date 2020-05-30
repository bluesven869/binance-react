import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createSocket } from './sockets/websocket';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import huobiApp from './reducers/market';
import { fetchSymbols } from './actions/market';

const store = createStore(huobiApp, applyMiddleware(thunk));
createSocket(store);
const r = Math.random().toString(36).substring(10);
store.dispatch(fetchSymbols(`https://www.huobi.com/-/x/pro/v2/beta/common/symbols?r=${r}`));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
