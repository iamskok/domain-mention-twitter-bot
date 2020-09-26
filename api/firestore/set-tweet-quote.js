import admin from 'firebase-admin';
import db from './db.js';
import logger from '../../services/logger.js';

const setTweetQuote = async (postTitle, quote) => {
  logger.log('info', '>>>> Call setTweetQuote');

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
      );
  } catch (error) {
    logger.log('error', 'Error in setTweetQuote()', {
      postTitle,
      quote,
    }, error);

    throw new Error('setTweetQuote:', error);
  }
};

export default setTweetQuote;
