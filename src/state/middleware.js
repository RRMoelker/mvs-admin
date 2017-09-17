import { TIMER_SET } from './timer/reducer';

//
// Adds time to payload
//
export const timeMiddleware = store => next => action => {
    const time = store.getState().timer.time;;
    const timedAction = {
        ...action,
        meta: {
            ...action.meta,
            time
        }
    };
    return next(timedAction);
};
