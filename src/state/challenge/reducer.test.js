import reducer, {
    addChallenge,
    removeChallenge,
    selectRemaining
} from './reducer.js';

describe('the challenge reducer', () => {
    it('should start with an empty list', () =>{
        const result = reducer(undefined, { type: 'NONE' });

        expect(result).toMatchSnapshot();
    });

    it('should push new challenges to the list', () =>{
        const action = addChallenge({
            name: 'minimap',
            duration: 1000
        });
        action.meta = { time: 0 };
        const actionB = addChallenge({
            name: 'glove',
            duration: 2000
        });
        actionB.meta = { time: 1 };

        const stepState = reducer(undefined, action);
        const result = reducer(stepState, actionB);

        expect(result).toMatchSnapshot();
    });
});

describe('the challenge reducer', () => {
    it('should remove elements from the list', () =>{
        const action = addChallenge({
            name: 'minimap',
            duration: 1000
        });
        action.meta = { time: 0 };
        const stepState = reducer(undefined, action);

        const result = reducer(stepState, removeChallenge({ uuid: stepState.list[0].uuid}));

        expect(result.list.length).toBe(0);
        expect(result).toMatchSnapshot();
    });
});

describe('select remaining challenges', () => {
    it('should calculate a single challenge', () =>{
        const action = addChallenge({
            name: 'glove',
            duration: 10
        });
        action.meta = { time: 1 };
        const state = reducer(undefined, action);

        const list = state.list;
        const result = selectRemaining(list, 3);

        expect(result).toEqual({
            glove: {
                remaining: 8,
                until: 11
            }
        });
    });

    it('should handle two challenges', () => {
        const action = addChallenge({
            name: 'glove',
            duration: 10
        });
        action.meta = { time: 5 };
        const actionB = addChallenge({
            name: 'glove',
            duration: 10
        });
        actionB.meta = { time: 20 };

        const stateA = reducer(undefined, action);
        const stateB = reducer(stateA, actionB);

        const list = stateB.list;
        const result = selectRemaining(list, 25);

        expect(result).toEqual({
            glove: {
                remaining: 5,
                until: 30
            }
        });
    });

    it('should handle overlapping challenges', () => {
        const action = addChallenge({
            name: 'glove',
            duration: 10
        });
        action.meta = { time: 5 };
        const actionB = addChallenge({
            name: 'glove',
            duration: 10
        });
        actionB.meta = { time: 10 };
        const stateA = reducer(undefined, action);
        const stateB = reducer(stateA, actionB);

        const list = stateB.list;
        const result = selectRemaining(list, 12);

        expect(result).toEqual({
            glove: {
                remaining: 13,
                until: 25
            }
        });
    });

    it('should be empty if all challenges have passed', () => {
        const action = addChallenge({
            name: 'glove',
            duration: 10
        });
        action.meta = { time: 0 };
        const actionB = addChallenge({
            name: 'glove',
            duration: 10
        });
        actionB.meta = { time: 20 };
        const actionC = addChallenge({
            name: 'glove',
            duration: 10
        });
        actionC.meta = { time: 40 };
        const stateA = reducer(undefined, action);
        const stateB = reducer(stateA, actionB);
        const stateC = reducer(stateB, actionC);

        const list = stateC.list;
        const result = selectRemaining(list, 51);

        expect(result).toEqual({});
    });

    it('should support mixed challenges', () => {
        const action = addChallenge({
            name: 'glove',
            duration: 10
        });
        action.meta = { time: 0 };
        const actionB = addChallenge({
            name: 'map',
            duration: 10
        });
        actionB.meta = { time: 15 };
        const actionC = addChallenge({
            name: 'health',
            duration: 10
        });
        actionC.meta = { time: 18 };
        const stateA = reducer(undefined, action);
        const stateB = reducer(stateA, actionB);
        const stateC = reducer(stateB, actionC);

        const list = stateC.list;
        const result = selectRemaining(list, 19);

        expect(result).toEqual({
            map: {
                remaining: 6,
                until: 25
            },
            health: {
                remaining: 9,
                until: 28
            }
        });
    });
});
