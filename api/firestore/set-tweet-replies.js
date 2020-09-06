const db = require("./db")

const setTweetReplies = async (postTitle, tweetId, replies) => {
  const docRef = db.doc(`posts/${postTitle}`)

  return await docRef.collection(`tweets`)
    .doc(tweetId)
    .set(
      {
        replies: replies,
      },
      {
        merge: true,
      },
    )
}

module.exports = setTweetReplies
