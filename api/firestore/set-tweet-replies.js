import db from "./db.js"

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

export default setTweetReplies
