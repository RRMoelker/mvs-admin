import { createAction } from 'redux-actions';

import { mergeChallenges } from './merger.js';
import {
    calculateActive,
    calculateRemaining,
    groupChallenges,
    getRemaining
} from './compute.js';

const CHALLENGE_ADD = 'CHALLENGE_ADD';
export const addChallenge = createAction(CHALLENGE_ADD);

const initialState = {
    list: [],
}

export const selectRemaining = (list, now) => {
    const grouped = groupChallenges(list);

    const remaining = {};
    for( const [ key, groupList ] of Object.entries(grouped)) {
        const merged = mergeChallenges(groupList);
        const active = calculateActive(merged, now);
        if ( active.length ) {
            remaining[key] = calculateRemaining(active, now);
        }
    }
    return remaining;
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
