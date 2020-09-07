import db from './db.js';

const setTweetReplies = async (postTitle, tweetId, replies) => {
  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        replies,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default setTweetReplies;
