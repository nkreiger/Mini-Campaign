// primary location for starting up the redux side of things in are application, and pulling in the root components from App.js to the dom
import React from "react";
import ReactDom from "react-dom";

// Provider tag glues react to redux store
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
// the entire purpose of redux-thunk is to allow an action to dispatch function directly too all the different reducers in the store so a new value is produced in the state and back to the store INSTANTANEOUSLY

// import components
import App from "./App";
// import reducers
import reducers from "./reducers";

// test
import axios from "axios";
window.axios = axios;

// make redux store to keep state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// takes two arguments, first is root component, then second is where we are attempting to render that component too inside of the DOM
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// provider tag can read changes in the prop react store we set in, so it can re-render these changes in our application

// . files are invisible in finder
