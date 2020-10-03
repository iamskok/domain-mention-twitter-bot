import moment from 'moment';

const loggerTimestamp = (time) => moment(time).format('YYYY-MM-DD HH:mm:ss:SSS');

const commentTimestamp = (time) => moment(Date.parse(time)).format('MM-DD-YYYY');

export { loggerTimestamp, commentTimestamp };
