import { combineReducers, createStore, compose } from 'redux';
import { createAction } from 'redux-actions';
import moment from 'moment';

import challengeReducer from './challenge/reducer';
import timerReducer, { TIMER_SET } from './timer/reducer';

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
const enhancer = composeEnhancers();
const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

// Development logging
// console.log('initial: ', store.getState());
// store.subscribe(() => console.log(store.getState()));

export default store;
