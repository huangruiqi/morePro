import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import {createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, logger)
    )
);
sagaMiddleware.run(mySaga);                                                                                                                                                                                                               

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.getElementById('root'));
