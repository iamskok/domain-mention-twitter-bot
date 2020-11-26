import firebase from '../../services/firebase';
import logger from '../../services/logger';

// eslint-disable-next-line no-underscore-dangle
let _db = null;

try {
  _db = firebase.firestore();

  logger.log('info', 'Initialise `firestore`');
} catch (error) {
  logger.log('error', '`db` catch block', {
    error,
  });
}

const DB = _db;

export default DB;
