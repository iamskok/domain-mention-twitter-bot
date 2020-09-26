import firebase from '../../services/firebase.js';
import logger from '../../services/logger.js';

const db = [];

try {
  db[0] = firebase.firestore();

  logger.log('info', 'Initialise `firestore`');
} catch (error) {
  logger.log('error', '`db`', {
    errorObject: error,
  });

  throw new Error(error);
}

export default db[0];
