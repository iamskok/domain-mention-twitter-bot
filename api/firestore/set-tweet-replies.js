import db from './db.js';
import logger from '../../services/logger.js';

const setTweetReplies = async (postTitle, tweetId, replies) => {
  logger.log('info', '>>>> Enter `firebase/setTweetReplies`');

  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        replies,
      },
      {
        merge: true,
      },
    ).then(() => {
      logger.log('info', '>>>> Exit `firebase/setTweetReplies`');
    });
  } catch (error) {
    logger.log('error', '`firebase/setTweetReplies`', {
      postTitle,
      tweetId,
      replies,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/setTweetReplies`', error);
  }
};

export default setTweetReplies;
