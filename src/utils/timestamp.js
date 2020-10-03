import moment from 'moment';

// Format '2020-10-03T00:00:00.000Z` timestamp.
const loggerTimestamp = (time) => moment(time).format('YYYY-MM-DD HH:mm:ss:SSS');

// Format twitter `Sun Oct 03 00:00:00 +0000 2020` timestamp.
const commentTimestamp = (time) => moment(Date.parse(time)).format('MM-DD-YYYY');

export { loggerTimestamp, commentTimestamp };
