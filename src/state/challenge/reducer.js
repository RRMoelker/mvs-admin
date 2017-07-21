import { createAction } from 'redux-actions';

import { mergeChallenges } from './merger.js';
import {
    calculateActive,
    getRemaining
} from './compute.js';

const CHALLENGE_ADD = 'CHALLENGE_ADD';
export const addChallenge = createAction(CHALLENGE_ADD);

const initialState = {
    list: [],
}

export const selectRemaining = (list, now) => {
    const merged = mergeChallenges(list);
    const active = calculateActive(merged, now);
    return getRemaining(active, now);
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHALLENGE_ADD:
            const { name, duration, time } = action.payload;

            const list = [ ...state.list, {
                name,
                duration,
                time,
            }];

            return {
                ...state,
                list: list,
            }
        default:
            return state;
    }
};
