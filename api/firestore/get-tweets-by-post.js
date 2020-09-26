import db from './db.js';
import logger from '../../services/logger.js';

const getTweetsByPost = async (postTitle) => {
  logger.log('info', '>>>> Enter `firebase/getTweetsByPost`');

  try {
    const tweets = await db.collection(`posts/${postTitle}/tweets`).get();

    logger.log('debug', '`firebase/getTweetsByPost` tweets', tweets);
    logger.log('info', '>>>> Exit `firebase/getTweetsByPost`');

    return tweets;
  } catch (error) {
    logger.log('error', '`firebase/getTweetsByPost`', {
      postTitle,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/getTweetsByPost`', error);
  }
};

export default getTweetsByPost;
