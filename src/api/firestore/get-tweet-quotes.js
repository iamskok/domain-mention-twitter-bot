import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

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
    logger.log('verbose', `firebase/getTweetQuotes get tweet quotes from firebase ${firestoreUrl({ postTitle, tweetId })}`);
    logger.log('info', '>>>> Exit `firebase/getTweetQuotes`');

    return quotes;
  } catch ({ message }) {
    logger.log('error', '`firebase/getTweetQuotes` catch block', {
      postTitle,
      tweetId,
    },
    {
      errorObject: message,
    });
  }

  return [];
};

export default getTweetQuotes;
