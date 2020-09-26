import db from './db.js';
import logger from '../../services/logger.js';

const getTweetReplies = async (postTitle, tweetId) => {
  logger.log('info', '>>>> Enter `firebase/getTweetReplies`');

  try {
    const docRef = db.doc(`posts/${postTitle}`);

    const replies = (
      await docRef.collection('tweets').doc(tweetId).get()
    ).data().replies || [];

    logger.log('debug', '`firebase/getTweetReplies`', {
      tweetId,
      replies,
    });
    logger.log('info', '>>>> Exit `firebase/getTweetReplies`');

    return replies;
  } catch (error) {
    logger.log('error', '`firebase/getTweetReplies`', {
      postTitle,
      tweetId,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/getTweetReplies`', error);
  }
};

export default getTweetReplies;
