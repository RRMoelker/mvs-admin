export const calculateRemaining = (challenges, now) => {
    let sumRemaining = 0;
    let until;
    for (const item of challenges) {
        const remaining = (item.duration + item.time) - now;
        if (remaining <= 0) {
            assert(false); // only active challenges should be passed
        } else {
            sumRemaining += remaining;
            if ( until ) {
                until += remaining;
            } else {
                until = item.time + item.duration;
            }
        }
    }
    return {
        remaining: sumRemaining,
        until
    };
};

export const calculateActive = (list, now) => {
    return list.filter(
        item =>
            now >= item.time
            && now <= item.time + item.duration
    );
};

export const groupChallenges = list => {
    if ( list.length === 0 ) {
        return {};
    }
    const groups = list.reduce(
        (acc, val) => {
            acc[val.name] = [];
            return acc;
        },
        {}
    );
    return list.reduce(
        (acc, val) => {
            if(acc[val.name]) {
                acc[val.name].push(val);
            } else {
                acc[val.name] = [val];
            }
            return acc;
        },
        groups
    );
};

export const getRemaining = (list, now) => {
    const challengesObject = groupChallenges(list);

    const remaining = {};
    for( const [ key, value ] of Object.entries(challengesObject)) {
        remaining[key] = calculateRemaining(value, now);
    }
    return remaining;
};
