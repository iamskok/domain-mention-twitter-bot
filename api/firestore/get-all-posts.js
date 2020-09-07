import db from './db.js';

const getAllPosts = async () => {
  try {
    return await db.collection('posts').get();
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllPosts;
