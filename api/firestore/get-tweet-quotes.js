import db from './db.js';

const getTweetQuotes = async (postTitle, tweetId) => {
  const docRef = db.doc(`posts/${postTitle}`);

  return (
    await docRef.collection('tweets').doc(tweetId).get()
  )
    .data()
    .quotes || [];
};

export default getTweetQuotes;
