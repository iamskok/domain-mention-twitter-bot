import db from './db.js';
import logger from '../../services/logger.js';

const setTweetQuotes = async (postTitle, tweetId, quotes) => {
  logger.log('info', '>>>> Call setTweetQuotes');

  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        quotes,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    logger.log('error', 'Error in setTweetQuotes()', {
      postTitle,
      tweetId,
      quotes,
    }, error);

    throw new Error('setTweetQuotes:', error);
  }
};

export default setTweetQuotes;
