import { createAction } from 'redux-actions';

export const TIME_SET = 'TIME_SET';
export const setTime = createAction(TIME_SET);
const TIME_RESET = 'TIME_RESET';
export const resetTime = createAction(TIME_RESET);
const TIME_PAUSE = 'TIME_PAUSE';
export const pauseTime = createAction(TIME_PAUSE);

const initialState = {
    time: 0,
    running: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TIME_RESET:
            return {
                ...state,
                time: 0,
            }
        case TIME_SET:
            return {
                ...state,
                time: action.payload.time,
            }
        case TIME_PAUSE:
            return {
                ...state,
                running: !state.running
            }
        default:
            return state;
    }
}
