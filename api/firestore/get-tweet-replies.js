const db = require("./db")

const getTweetReplies = async (postTitle, tweetId) => {
  const docRef = db.doc(`posts/${postTitle}`)

  return (
    await docRef.collection(`tweets`).doc(tweetId).get()
  )
  .data()
  .replies || []
}

module.exports = getTweetReplies
