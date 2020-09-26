import db from './db.js';
import logger from '../../services/logger.js';

const setTweet = async (postTitle, tweet) => {
  logger.log('info', '>>>> Call setTweet');

  try {
    const docRef = await db.doc(`posts/${postTitle}`);
    // Resolve "This document does not exist, it will not appear in queries or snapshots" error
    // by adding at least one field to the document.
    docRef.set({ updated: Date.now() });

    logger.log('debug', `Update ${postTitle} date`);
    logger.log('debug', `Update "tweets" collection in ${postTitle} document`, {
      id_str: tweet.id_str,
      tweet,
    });

    return docRef.collection('tweets')
      .doc(tweet.id_str)
      .set(tweet);
  } catch (error) {
    logger.log('error', 'Error in setTweet()', {
      postTitle,
      id_str: tweet.id_str,
      tweet,
    }, error);

    throw new Error('setTweet:', error);
  }
};

export default setTweet;
