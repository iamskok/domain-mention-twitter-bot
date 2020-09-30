import db from './db';
import logger from '../../services/logger';
import firestoreURL from '../../utils/firestore-url';

const getTweetQuotes = async (postTitle, tweetId) => {
  logger.log('info', '>>>> Enter `firebase/getTweetQuotes`');

  try {
    const docRef = db.doc(`posts/${postTitle}`);

    const quotes = (
      await docRef.collection('tweets').doc(tweetId).get()
    ).data().quotes || [];

    logger.log('debug', '`firebase/getTweetQuotes` quotes', {
      tweetId,
      quotes,
    });
    logger.log('verbose', `Get tweet quotes from firebase ${firestoreURL({ postTitle, tweetId })}`);
    logger.log('info', '>>>> Exit `firebase/getTweetQuotes`');

    return quotes;
  } catch (error) {
    logger.log('error', '`firebase/getTweetQuotes`', {
      postTitle,
      tweetId,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/getTweetQuotes`', error);
  }
};

export default getTweetQuotes;
