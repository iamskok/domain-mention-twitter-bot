import db from './db.js';
import logger from '../../services/logger.js';

const getTweetQuotes = async (postTitle, tweetId) => {
  logger.log('info', '>>>> Call getTweetQuotes');

  try {
    const docRef = db.doc(`posts/${postTitle}`);

    return (
      await docRef.collection('tweets').doc(tweetId).get()
    )
      .data()
      .quotes || [];
  } catch (error) {
    logger.log('error', 'Error in getTweetQuotes()', {
      postTitle,
      tweetId,
    }, error);

    throw new Error('getTweetQuotes:', error);
  }
};

export default getTweetQuotes;
