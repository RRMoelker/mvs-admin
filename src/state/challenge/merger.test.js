import { mergeOverlapping } from './merger.js';

it('should return single item lists', () => {
    const list = [
        { time: 1000, duration: 1000}
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual(list);
});

it('should not merge non overlapping challenges', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 3000, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual(list);
});

it('should merge overlapping challenges', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 1500, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual([
        { time: 1000, duration: 2000 }
    ]);
});

it('should merge directly following challenges', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 2000, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual([
        { time: 1000, duration: 2000 }
    ]);
});

it('should handle multiple overlaps', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 1200, duration: 1000},
        { time: 1300, duration: 1000},
        { time: 1500, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual([
        { time: 1000, duration: 4000 }
    ]);
});

it('should split overlaps', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 1200, duration: 1000},
        { time: 4000, duration: 1000},
        { time: 4200, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual([
        { time: 1000, duration: 2000 },
        { time: 4000, duration: 2000 },
    ]);
});

it('should handle very complex input', () =>{
    const list = [
        { time: 1000, duration: 1000},
        { time: 3000, duration: 1000},
        { time: 4000, duration: 1000},
        { time: 6000, duration: 1000},
        { time: 6001, duration: 1000},
        { time: 6002, duration: 1000},
        { time: 8500, duration: 1000},
    ];

    const result = mergeOverlapping(list);

    expect(result).toEqual([
        { time: 1000, duration: 1000 },
        { time: 3000, duration: 2000 },
        { time: 6000, duration: 4000 },
    ]);
});
