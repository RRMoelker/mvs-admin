import {
    calculateActive,
    calculateRemaining,
    calculateRecent,
    groupChallenges
} from './compute.js';

describe('active challenges', () => {
    it('should find a single challenge', () =>{
        const list = [
            {
                name: 'minimap',
                duration: 1000,
                time: 1000
            }
        ];

        expect(calculateActive(list, 1000)).toEqual(list);
        expect(calculateActive(list, 1500)).toEqual(list);
        expect(calculateActive(list, 2000)).toEqual(list);
    });

    it('should filter an inactive challenge', () => {
        const list = [
            {
                name: 'minimap',
                duration: 1000,
                time: 1000
            }
        ];

        expect(calculateActive(list, 999)).toEqual([]);
        expect(calculateActive(list, 2001)).toEqual([]);
        expect(calculateActive(list, 2500)).toEqual([]);
    });
});

describe('challenge grouping', () => {
    it('should does nothing to an empty array', () => {
        expect(groupChallenges([])).toEqual({});
    });

    it('should group challenges by name', () => {
        expect(groupChallenges([{
            name: 'minimap',
            duration: 10,
        }])).toEqual({
            minimap: [{
                name: 'minimap',
                duration: 10
            }]
        });
    });

    it('should group multiple challenges', () => {
        expect(groupChallenges([
            {
                name: 'minimap',
                duration: 10,
            },
            {
                name: 'health',
                duration: 10,
            },
            {
                name: 'minimap',
                duration: 10,
            }
        ])).toEqual({
            minimap: [{
                name: 'minimap',
                duration: 10
            },
            {
                name: 'minimap',
                duration: 10
            }],
            health: [{
                name: 'health',
                duration: 10,
            }]
        });
    });
});

describe('remaining challenges', () => {
    it('should calculate a single challenge', () => {
        const list = [
            {
                name: 'glove',
                duration: 10,
                time: 1
            }
        ];

        const now = 3;
        const active = calculateActive(list, now);
        const result = calculateRemaining(active, now);

        expect(result).toEqual({
            remaining: 8,
            until: 11
        });
    });

    it('should handle two challenges', () => {
        const list = [
            {
                name: 'glove',
                duration: 10,
                time: 5
            },
            {
                name: 'glove',
                duration: 10,
                time: 20
            }
        ];

        const now = 25;
        const active = calculateActive(list, now);
        const result = calculateRemaining(active, now);

        expect(result).toEqual({
            remaining: 5,
            until: 30
        });
    });

    it('should be empty if all challenges have passed', () => {
        const list = [
            {
                name: 'glove',
                duration: 10,
                time: 5
            },
            {
                name: 'glove',
                duration: 10,
                time: 20
            },
            {
                name: 'glove',
                duration: 10,
                time: 40
            }
        ];

        const now = 51;
        const active = calculateActive(list, now);
        const result = calculateRemaining(active, now);

        expect(result).toEqual({
            remaining: 0,
            until: undefined
        });
    });
});

describe('recent challenges', () => {
    it('returns recent', () => {
        const list = [
            {
                name: 'glove',
                duration: 10,
                time: 1
            }
        ];

        const now = 3;
        const result = calculateRecent(list, now, 5);

        expect(result).toEqual(list);
    });

    it('does not return beyond threshold', () => {
        const list = [
            {
                name: 'glove',
                duration: 10,
                time: 1
            }
        ];

        const now = 3;
        const result = calculateRecent(list, now, 1);

        expect(result).toEqual([]);
    });
});
