import db from './db';
import logger from '../../services/logger';
import firestoreURL from '../../utils/firestore-url';

const getTweetsByPost = async (postTitle) => {
  logger.log('info', '>>>> Enter `firebase/getTweetsByPost`');

  try {
    const tweets = await db.collection(`posts/${postTitle}/tweets`).get();

    logger.log('debug', '`firebase/getTweetsByPost` tweets', { tweets });
    logger.log('verbose', `firebase/getTweetsByPost get tweets by post from firebase ${firestoreURL({ postTitle })}`);
    logger.log('info', '>>>> Exit `firebase/getTweetsByPost`');

    return tweets;
  } catch (error) {
    logger.log('error', '`firebase/getTweetsByPost` catch block', {
      postTitle,
    },
    {
      errorObject: error,
    });
  }

  return [];
};

export default getTweetsByPost;
