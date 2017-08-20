import moment from 'moment';

export const formatTime = milliseconds => {
    const isNegative = milliseconds < 0;
    if ( isNegative ) milliseconds = -milliseconds;
    const time = moment.utc(milliseconds);
    const hours = time.hours();
    const format = hours > 0
        ? 'H:mm:ss.SS'
        : 'mm:ss.SS';

    if (isNegative) {
        return '-' + time.format(format);
    } else {
        return time.format(format);
    }

};
