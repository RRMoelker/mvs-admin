// import { reduxSwarmLogMiddleware } from '@philholden/redux-swarmlog';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { createAction } from 'redux-actions';
import moment from 'moment';

import { timeMiddleware } from './middleware.js';
import challengeReducer from './challenge/reducer';
import timerReducer, { TIMER_SET } from './timer/reducer';

// import keys from '../keys.json';
// import { addReduxSwarmLog, configureReduxSwarmLog } from '@philholden/redux-swarmlog';

// addReduxSwarmLog({
//     name: 'mvs-admin',
//     keys
// });

const rootReducer = combineReducers({
    timer: timerReducer,
    challenge: challengeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        timeMiddleware,
        // reduxSwarmLogMiddleware
    )
);
const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

// configureReduxSwarmLog({ reduxStore: store });

export default store;
