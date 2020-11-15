import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

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
      logger.log('verbose', `firebase/setTweetQuotes save tweet quotes in firebase ${firestoreUrl({ postTitle, tweetId })}`);
      logger.log('info', '>>>> Exit `firebase/setTweetQuotes`');
    });
  } catch ({ message }) {
    logger.log('error', '`firebase/setTweetQuotes` catch block', {
      postTitle,
      tweetId,
      quotes,
    },
    {
      errorObject: message,
    });
  }

  return null;
};

export default setTweetQuotes;
