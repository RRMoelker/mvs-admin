import moment from 'moment';

export const formatTime = milliseconds => {
    const time = moment.utc(milliseconds);
    const hours = time.hours();
    const format = hours > 0
        ? 'H:mm:ss:SS'
        : 'mm:ss:SS';

    return time.format(format);
};
