const db = require("./db")

const setTweet = async (postTitle, tweet) => {
  const docRef = await db.doc(`posts/${postTitle}`)
  // Resolve "This document does not exist, it will not appear in queries or snapshots" error
  // by adding at least one field to the document.
  docRef.set({ updated: Date.now() })

  return docRef.collection(`tweets`)
    .doc(tweet.id_str)
    .set(tweet)
}

module.exports = setTweet
