import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

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
        logger.log('verbose', `firebase/setCommentsByPost save post comments in firebase ${firestoreUrl({ postTitle })}`);
        logger.log('info', '>>>> Exit `firebase/setCommentsByPost`');
      });
  } catch (error) {
    logger.log('error', '`firebase/setCommentsByPost` catch block', {
      postTitle,
      comments,
    },
    {
      errorObject: error,
    });
  }

  return null;
};

export default setCommentsByPost;
