import admin from 'firebase-admin';
import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

const setTweetQuote = async (postTitle, quote) => {
  logger.log('info', '>>>> Enter `firebase/setTweetQuote`');

  try {
    const docRef = await db.doc(`posts/${postTitle}`);

    return docRef.collection('tweets')
      .doc(quote.quoted_status.id_str)
      .set(
        {
          quotes: admin.firestore.FieldValue.arrayUnion(quote),
        },
        {
          merge: true,
        },
      ).then(() => {
        logger.log('debug', '`firebase/setTweetQuote` quote', { quote });
        logger.log('verbose', `firebase/setTweetQuote save tweet quote in firebase ${firestoreUrl({ postTitle, tweetId: quote.quoted_status.id_str })}`);
        logger.log('info', '>>>> Exit `firebase/setTweetQuote`');
      });
  } catch (error) {
    logger.log('error', '`firebase/setTweetQuote` catch block', {
      postTitle,
      quote,
    },
    {
      error,
    });
  }

  return null;
};

export default setTweetQuote;
