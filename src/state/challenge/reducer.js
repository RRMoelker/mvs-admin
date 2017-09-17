import { createAction } from 'redux-actions';

// import { reduxSwarmLogId } from '../actions.js';

import { mergeOverlapping } from './merger.js';
import {
    calculateActive,
    calculateRecent,
    calculateRemaining,
    groupChallenges,
    getRemaining
} from './compute.js';

const CHALLENGE_ADD = 'CHALLENGE_ADD';
// export const addChallenge = createAction(CHALLENGE_ADD);
export const addChallenge = payload => ({
    type: CHALLENGE_ADD,
    payload,
    // reduxSwarmLogId
});

const CHALLENGE_REMOVE = 'CHALLENGE_REMOVE';
// export const removeChallenge = createAction(CHALLENGE_REMOVE);
export const removeChallenge = payload => ({
    type: CHALLENGE_REMOVE,
    payload,
    // reduxSwarmLogId
});

const initialState = {
    list: [],
}

export const selectRemaining = (list, now) => {
    const grouped = groupChallenges(list);

    const remaining = {};
    for( const [ key, groupList ] of Object.entries(grouped)) {
        const merged = mergeOverlapping(groupList);
        const active = calculateActive(merged, now);
        if ( active.length ) {
            remaining[key] = calculateRemaining(active, now);
        }
    }
    return remaining;
}

export const selectRecent = (list, now, threshold) => {
    const recentList = calculateRecent(list, now, threshold);
    const grouped = groupChallenges(recentList);
    const result = {};
    for( const [ key, value ] of Object.entries(grouped) ) {
        result[key] = value.reduce(
            (acc, val) => acc + val.duration,
            0
        );
    };
    return result;
}

let uuid = 0; // TODO: use uuid

export default (state = initialState, action) => {
    switch (action.type) {
        case CHALLENGE_ADD:
            const { name, duration } = action.payload;
            const { time } = action.meta;

            const list = [ ...state.list, {
                uuid,
                name,
                duration,
                time,
            }];
            uuid++;

            return {
                ...state,
                list: list,
            }
        case CHALLENGE_REMOVE:
            const filteredList = state.list.filter( item => item.uuid !== action.payload.uuid);
            return {
                ...state,
                list: filteredList
            };
        default:
            return state;
    }
};
