import db from './db.js';
import logger from '../../services/logger.js';

const setTweetReplies = async (postTitle, tweetId, replies) => {
  logger.log('info', '>>>> Call setTweetReplies');

  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        replies,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    logger.log('error', 'Error in setTweetReplies()', {
      postTitle,
      tweetId,
      replies,
    }, error);

    throw new Error('setTweetReplies:', error);
  }
};

export default setTweetReplies;
