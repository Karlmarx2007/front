import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCannabis, faCouch, faBolt, faCookieBite, faJoint, faCheckCircle, faShoppingBag, faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import store from './app/store';


library.add(faCannabis, faCouch, faBolt, faCookieBite, faJoint, faCheckCircle, faShoppingBag, faUser, faTrash, faEdit);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
