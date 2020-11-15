import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

const setTweet = async (postTitle, tweet) => {
  logger.log('info', '>>>> Enter `firebase/setTweet`');

  try {
    const docRef = await db.doc(`posts/${postTitle}`);
    // Resolve "This document does not exist, it will not appear in queries or snapshots" error
    // by adding at least one field to the document.
    docRef.set({ updated: Date.now() });

    logger.log('debug', `firebase/setTweet update ${postTitle} date`);
    logger.log('debug', `firebase/setTweet update "tweets" collection in ${postTitle} document`, {
      id_str: tweet.id_str,
      tweet,
    });

    return docRef.collection('tweets')
      .doc(tweet.id_str)
      .set(tweet)
      .then(() => {
        logger.log('debug', '`firebase/setTweet` tweet', { tweet });
        logger.log('verbose', `firebase/setTweet save tweet in firebase ${firestoreUrl({ postTitle, tweetId: tweet.id_str })}`);
        logger.log('info', '>>>> Exit `firebase/setTweet`');
      });
  } catch ({ message }) {
    logger.log('error', '`firebase/setTweet` catch block', {
      postTitle,
      id_str: tweet.id_str,
      tweet,
    },
    {
      errorObject: message,
    });
  }

  return null;
};

export default setTweet;
