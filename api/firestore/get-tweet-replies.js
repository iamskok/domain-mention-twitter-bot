import db from './db.js';
import logger from '../../services/logger.js';

const getTweetReplies = async (postTitle, tweetId) => {
  logger.log('info', '>>>> Call getTweetReplies');

  try {
    const docRef = db.doc(`posts/${postTitle}`);

    return (
      await docRef.collection('tweets').doc(tweetId).get()
    )
      .data()
      .replies || [];
  } catch (error) {
    logger.log('error', 'Error in getTweetReplies()', {
      postTitle,
      tweetId,
    }, error);

    throw new Error('getTweetReplies:', error);
  }
};

export default getTweetReplies;
