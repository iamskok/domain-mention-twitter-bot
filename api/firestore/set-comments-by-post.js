import db from './db.js';

const setCommentsByPost = async (postTitle, comments) => {
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
    throw new Error(error);
  }
};

export default setCommentsByPost;
