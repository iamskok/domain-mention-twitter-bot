import db from './db';
import logger from '../../services/logger';
import firestoreURL from '../../utils/firestore-url';

const setTweetReplies = async (postTitle, tweetId, replies) => {
  logger.log('info', '>>>> Enter `firebase/setTweetReplies`');

  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        replies,
      },
      {
        merge: true,
      },
    ).then(() => {
      logger.log('debug', '`firebase/setTweetReplies` replies', { replies });
      logger.log('verbose', `firebase/setTweetReplies save tweet replies in firebase ${firestoreURL({ postTitle, tweetId })}`);
      logger.log('info', '>>>> Exit `firebase/setTweetReplies`');
    });
  } catch (error) {
    logger.log('error', '`firebase/setTweetReplies` catch block', {
      postTitle,
      tweetId,
      replies,
    },
    {
      errorObject: error,
    });
  }

  return null;
};

export default setTweetReplies;
