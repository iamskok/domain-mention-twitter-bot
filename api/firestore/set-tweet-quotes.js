import db from './db.js';

const setTweetQuotes = async (postTitle, tweetId, quotes) => {
  const docRef = db.doc(`posts/${postTitle}`);

  try {
    return await docRef.collection('tweets').doc(tweetId).set(
      {
        quotes,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default setTweetQuotes;
