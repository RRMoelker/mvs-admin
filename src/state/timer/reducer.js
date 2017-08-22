import { createAction } from 'redux-actions';

export const TIMER_SET = 'TIMER_SET';
export const setTimer = createAction(TIMER_SET);
const TIMER_RESET = 'TIMER_RESET';
export const resetTimer = createAction(TIMER_RESET);
const TIMER_PAUSE = 'TIMER_PAUSE';
export const pauseTimer = createAction(TIMER_PAUSE);

const initialState = {
    time: 0,
    running: true
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
                time: action.payload.time,
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
