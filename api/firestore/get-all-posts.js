import db from './db';
import logger from '../../services/logger';
import firestoreURL from '../../utils/firestore-url';

const getAllPosts = async () => {
  logger.log('info', '>>>> Enter `firebase/getAllPosts`');

  try {
    const collection = await db.collection('posts').get();

    logger.log('debug', '`firebase/getAllPosts` collection', { collection });
    logger.log('verbose', `Get all posts from firebase ${firestoreURL()}`);
    logger.log('info', '>>>> Exit `firebase/getAllPosts`');

    return collection;
  } catch (error) {
    logger.log('error', '`firebase/getAllPosts`', {
      errorObject: error,
    });

    throw new Error('`firebase/getAllPosts`', error);
  }
};

export default getAllPosts;
