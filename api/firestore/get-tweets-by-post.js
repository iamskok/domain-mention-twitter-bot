import db from './db.js';
import logger from '../../services/logger.js';

const getTweetsByPost = async (postTitle) => {
  logger.log('info', '>>>> Call getTweetsByPost');

  try {
    return await db.collection(`posts/${postTitle}/tweets`).get();
  } catch (error) {
    logger.log('error', 'Error in getTweetsByPost()', {
      postTitle,
    }, error);

    throw new Error('getTweetsByPost:', error);
  }
};

export default getTweetsByPost;
