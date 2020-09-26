import db from './db.js';
import logger from '../../services/logger.js';

const getAllPosts = async () => {
  logger.log('info', '>>>> Call getAllPosts');

  try {
    return await db.collection('posts').get();
  } catch (error) {
    logger.log('error', 'Error in setTweetQuotes()', error);

    throw new Error('getAllPosts:', error);
  }
};

export default getAllPosts;
