import { combineReducers, createStore, compose } from 'redux';
import { createAction } from 'redux-actions';
import moment from 'moment';

import challengeReducer from './challenge/reducer';
import timeReducer, { TIME_SET } from './time/reducer';

const combined = combineReducers({
    time: timeReducer,
    challenge: challengeReducer
});

const rootReducer = (state, action) => {
    // TODO: create middleware that timestamps each action OR wrap all action creators so they add the time
    let time;
    if (action.type === TIME_SET ) {
        time = action.payload;
    } else {
        time = state.time && state.time.time;
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
