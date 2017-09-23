import { createAction } from 'redux-actions';

import { reduxSwarmLogId } from '../actions.js';

export const TIMER_SET = 'TIMER_SET';
// export const setTimer = createAction(TIMER_SET);
export const setTimer = payload => ({
    type: TIMER_SET,
    payload,
    reduxSwarmLogId
});

const TIMER_RESET = 'TIMER_RESET';
// export const resetTimer = createAction(TIMER_RESET);
export const resetTimer = payload => ({
    type: TIMER_RESET,
    payload,
    reduxSwarmLogId
});

const TIMER_PAUSE = 'TIMER_PAUSE';
// export const pauseTimer = createAction(TIMER_PAUSE);
export const pauseTimer = payload => ({
    type: TIMER_PAUSE,
    payload,
    // reduxSwarmLogId
});

const initialState = {
    time: 0,
    running: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TIMER_RESET:
            return {
                ...state,
                time: 0,
            }
        case TIMER_SET:
            return {
                ...state,
                time: action.payload,
            }
        case TIMER_PAUSE:
            return {
                ...state,
                running: !state.running
            }
        default:
            return state;
    }
}
