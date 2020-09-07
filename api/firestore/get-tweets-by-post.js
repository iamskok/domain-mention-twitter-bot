import db from './db.js';

const getTweetsByPost = async (postTitle) => {
  try {
    return await db.collection(`posts/${postTitle}/tweets`).get();
  } catch (error) {
    throw new Error(error);
  }
};

export default getTweetsByPost;
