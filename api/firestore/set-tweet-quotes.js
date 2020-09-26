import db from './db.js';
import logger from '../../services/logger.js';

const setTweetQuotes = async (postTitle, tweetId, quotes) => {
  logger.log('info', '>>>> Enter `firebase/setTweetQuotes`');

  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        quotes,
      },
      {
        merge: true,
      },
    ).then(() => {
      logger.log('info', '>>>> Exit `firebase/setTweetQuotes`');
    });
  } catch (error) {
    logger.log('error', '`setTweetQuotes`', {
      postTitle,
      tweetId,
      quotes,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/setTweetQuotes`', error);
  }
};

export default setTweetQuotes;
