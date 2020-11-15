import firebase from '../../services/firebase';
import logger from '../../services/logger';

const db = [];

try {
  db[0] = firebase.firestore();

  logger.log('info', 'Initialise `firestore`');
} catch ({ message }) {
  logger.log('error', '`db` catch block', {
    errorObject: message,
  });
}

export default db[0];
