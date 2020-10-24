import firebase from '../../services/firebase';
import logger from '../../services/logger';

const db = [];

try {
  db[0] = firebase.firestore();

  logger.log('info', 'Initialise `firestore`');
} catch (error) {
  logger.log('error', '`db` catch block', {
    errorObject: error,
  });
}

export default db[0];
