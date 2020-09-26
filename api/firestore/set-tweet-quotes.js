import db from './db.js';
import logger from '../../services/logger.js';
import firestoreURL from '../../utils/firestore-url.js';

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
      logger.log('debug', '`firebase/setTweetQuotes` quotes', { quotes });
      logger.log('verbose', `Save tweet quotes in firebase ${firestoreURL({ postTitle, tweetId })}`);
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
