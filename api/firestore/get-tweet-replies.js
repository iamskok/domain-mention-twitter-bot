import db from "./db.js"

const getTweetReplies = async (postTitle, tweetId) => {
  const docRef = db.doc(`posts/${postTitle}`)

  return (
    await docRef.collection(`tweets`).doc(tweetId).get()
  )
  .data()
  .replies || []
}

export default getTweetReplies
