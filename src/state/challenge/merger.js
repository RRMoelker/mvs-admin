/**
 * Merges overlapping challenges in list
 * @param  {Array} list array of objects { time, duration }
 */
export const mergeOverlapping = (list) => {
    let li = 0;
    let ri = li + 1;
    let protect = 0;

    const merged = JSON.parse(JSON.stringify(list));
    while(ri < merged.length && protect < 1000) {
        const left = merged[li];
        const right = merged[ri];
        if (left.time + left.duration >= right.time) {
            // overlapping challenges, merge
            merged[li].duration += right.duration;
            merged.splice(ri, 1);
        } else {
            // none overlapping, step over
            li = ri;
            ri = li + 1;
        }
        protect++;
    }
    if(protect>= 1000) {
        console.error('infinite loop');
    }

    return merged;
};
