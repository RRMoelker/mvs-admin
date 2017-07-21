import reducer, {
    addChallenge,
    selectRemaining
} from './reducer.js';

describe('the challenge reducer', () => {
    it('should start with an empty list', () =>{
        const result = reducer(undefined, { type: 'NONE' });

        expect(result).toMatchSnapshot();
    });

    it('should push new challenges to the list', () =>{
        const stepState = reducer(undefined, addChallenge({
            name: 'minimap',
            duration: 1000
        }));
        const result = reducer(stepState, addChallenge({
            name: 'glove',
            duration: 2000
        }));

        expect(result).toMatchSnapshot();
    });
});

describe('select remaining challenges', () => {
    it('should calculate a single challenge', () =>{
        const state = reducer(undefined, addChallenge({
            name: 'glove',
            duration: 10,
            time: 1
        }));

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
        const stateA = reducer(undefined, addChallenge({
            name: 'glove',
            duration: 10,
            time: 5
        }));
        const stateB = reducer(stateA, addChallenge({
            name: 'glove',
            duration: 10,
            time: 20
        }));

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
        const stateA = reducer(undefined, addChallenge({
            name: 'glove',
            duration: 10,
            time: 5
        }));
        const stateB = reducer(stateA, addChallenge({
            name: 'glove',
            duration: 10,
            time: 10
        }));

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
        const stateA = reducer(undefined, addChallenge({
            name: 'glove',
            duration: 10,
            time: 0
        }));
        const stateB = reducer(stateA, addChallenge({
            name: 'glove',
            duration: 10,
            time: 20
        }));
        const stateC = reducer(stateB, addChallenge({
            name: 'glove',
            duration: 10,
            time: 40
        }));

        const list = stateC.list;
        const result = selectRemaining(list, 51);

        expect(result).toEqual({
            glove: {
                remaining: 0,
                until: undefined
            }
        });
    });
});
