const admin = require("firebase-admin")
const firebase = require("../config/firebase")
const dedupeTweets = require("../utils/dedupe-tweets")

const db = firebase.firestore()

const getTweetsByPost = async postTitle => {
  try {
    return await db.collection(`posts/${postTitle}/tweets`).get()
  } catch (error) {
    console.error(error)
  }
}

const getAllPosts = async () => {
  try {
    return await db.collection(`posts`).get()
  } catch (error) {
    console.error(error)
  }
}

const setTweet = async (postTitle, tweet) => {
  const docRef = await db.doc(`posts/${postTitle}`)
  // Resolve "This document does not exist, it will not appear in queries or snapshots" error
  // by adding at least one field to the document.
  docRef.set({ updated: Date.now() })

  return docRef.collection(`tweets`)
    .doc(tweet.id_str)
    .set(tweet)
}

const setTweetReplies = async (postTitle, tweetId, newReplies) => {
  const docRef = await db.doc(`posts/${postTitle}`)

  const oldReplies = (
    await docRef.collection(`tweets`).doc(tweetId).get()
  ).data().replies || []

  const allReplies = dedupeTweets(oldReplies, newReplies)

  docRef.collection(`tweets`)
    .doc(tweetId)
    .set(
      {
        replies: allReplies,
      },
      {
        merge: true,
      },
    )
}

const setTweetQuote = async (postTitle, quote) => {
  const docRef = await db.doc(`posts/${postTitle}`)

  return docRef.collection(`tweets`)
    .doc(quote.quoted_status.id_str)
    .set(
      {
        quotes: admin.firestore.FieldValue.arrayUnion(quote),
      },
      {
        merge: true,
      },
    )
}

module.exports.getTweetsByPost = getTweetsByPost
module.exports.setTweet = setTweet
module.exports.setTweetReplies = setTweetReplies
module.exports.setTweetQuote = setTweetQuote
module.exports.getAllPosts = getAllPosts
