import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MainReduxComponent from './reduxsaga/mainreduxcomponent';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {reducer} from './reduxsaga/reducers/reducers';
import rootSaga from './reduxsaga/sagas/rootSaga';
import  createSagaMiddleware from 'redux-saga';

import reportWebVitals from './reportWebVitals';

// create a SagaMiidleware Object.
// this is a platform that will be provided to the store
// using this platfor, the store will also ask the SAGA Middleware
// to monitor actions those are dispatched from React Components
// executing under the Redux-Context

const sagaMiddleware= createSagaMiddleware();
// create a store and pasing the reducer and saga middleware
// so that they are running at root level
const store = configureStore({
  reducer:reducer,
  middleware:[sagaMiddleware]
});

// run the saga middleware
sagaMiddleware.run(rootSaga);

 
// the createRoot()
// Inform the renderer that 
// the 'HTMLElemennt' is root 
// that is used for mounting
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* the Provider will initialize the redux-contest
      with store loaded on it and hence all components
      working under this context will be able to
      subscribe to the store and also any action dispatched
      by the component will be monitored and listened by reducer and SAGA
    */}
    <Provider store={store}>
        <MainReduxComponent></MainReduxComponent>
    </Provider>
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
