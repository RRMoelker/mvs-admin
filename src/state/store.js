import { combineReducers, createStore, compose } from 'redux';
import { createAction } from 'redux-actions';
import moment from 'moment';

const TIME_SET = 'TIME_SET';
const setTime = createAction(TIME_SET);

const rootReducer = (state, action) => {
    switch (action.type) {
        case TIME_SET:
            return {
                ...state,
                time: action.payload,
            }
        default:
            return state;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers();
const initialState = {
    time: 0
};
const store = createStore(rootReducer, initialState, enhancer);

// Development logging
console.log('initial: ', store.getState());
store.subscribe(() => console.log(store.getState()));

const timeStart = moment();
setInterval(() => {
    const now = moment();
    const diff = now.diff(timeStart); // ms
    store.dispatch(setTime(diff));
}, 950);

export default store;
