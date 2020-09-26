import db from './db.js';
import logger from '../../services/logger.js';
import firestoreURL from '../../utils/firestore-url.js';

const setCommentsByPost = async (postTitle, comments) => {
  logger.log('info', '>>>> Enter `firebase/setCommentsByPost`');

  try {
    return await db.doc(`posts/${postTitle}`)
      .set(
        {
          comments,
        },
        {
          merge: true,
        },
      ).then(() => {
        logger.log('debug', '`firebase/setCommentsByPost` comments', { comments });
        logger.log('verbose', `Save post comments in firebase ${firestoreURL({ postTitle })}`);
        logger.log('info', '>>>> Exit `firebase/setCommentsByPost`');
      });
  } catch (error) {
    logger.log('error', '`firebase/setCommentsByPost`', {
      postTitle,
      comments,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/setCommentsByPost`', error);
  }
};

export default setCommentsByPost;
