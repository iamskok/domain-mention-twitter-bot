const firebase = require("firebase-admin")
const { normalizeTweet } = require("./helpers")

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
})

const db = firebase.firestore()

const getTweetsByPost = async post => {
  try {
    return await db.collection(`posts/${post}/tweets`).get()
  } catch (error) {
    console.log(error)
  }
}

const setPostTweet = async (postTitle, tweet) => {
  return await db.collection(`posts/${postTitle}/tweets`)
    .doc(tweet.id_str)
    .set(normalizeTweet(tweet))
}

module.exports.getTweetsByPost = getTweetsByPost
module.exports.setPostTweet = setPostTweet
module.exports._db = db
