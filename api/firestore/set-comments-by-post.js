import db from './db.js';
import logger from '../../services/logger.js';

const setCommentsByPost = async (postTitle, comments) => {
  logger.log('info', '>>>> Call setCommentsByPost');

  try {
    return await db.doc(`posts/${postTitle}`)
      .set(
        {
          comments,
        },
        {
          merge: true,
        },
      );
  } catch (error) {
    logger.log('error', 'Error in setCommentsByPost()', {
      postTitle,
      comments,
    }, error);

    throw new Error('setCommentsByPost:', error);
  }
};

export default setCommentsByPost;
