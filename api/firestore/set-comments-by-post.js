import db from './db.js';
import logger from '../../services/logger.js';

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
