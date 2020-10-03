import moment from 'moment';

const loggerTimestamp = () => moment().format('YYYY-MM-DD HH:mm:ss:SSS');

const commentTimestamp = () => moment().format('MM-DD-YYYY');

export { loggerTimestamp, commentTimestamp };
