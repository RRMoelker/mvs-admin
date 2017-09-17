import { reduxSwarmLogMiddleware } from '@philholden/redux-swarmlog';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { createAction } from 'redux-actions';
import moment from 'moment';

import challengeReducer from './challenge/reducer';
import timerReducer, { TIMER_SET } from './timer/reducer';

import keys from '../keys.json';
import { addReduxSwarmLog, configureReduxSwarmLog } from '@philholden/redux-swarmlog';

addReduxSwarmLog({
    name: 'mvs-admin',
    keys
});


const combined = combineReducers({
    timer: timerReducer,
    challenge: challengeReducer
});

const rootReducer = (state, action) => {
    // TODO: create middleware that timestamps each action OR wrap all action creators so they add the time
    let time;
    if (action.type === TIMER_SET ) {
        time = action.payload;
    } else {
        time = state.timer && state.timer.time;
    }
    const timedAction = {
        ...action,
        payload: {
            ...action.payload,
            time
        }
    };
    return combined(state, timedAction);
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        reduxSwarmLogMiddleware
    )
);
const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

configureReduxSwarmLog({ reduxStore: store });

export default store;
