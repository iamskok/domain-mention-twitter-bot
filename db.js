const firebase = require("firebase-admin")

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

// Handles Gatsby ID field being a number type
const stringifyObjectValue = (object, key = `id`) => {
  if (typeof object[key] === `number`) {
    object[key] = object[key].toString()
  }

  return object
}

// Set `profile_image_url_https` to 400x400
const setBiggerProfileImageUrl = object => {
  if (object.user.profile_image_url_https) {
    object.user.profile_image_url_https = object.user.profile_image_url_https.replace(/_normal/, `_400x400`)
  }

  return object
}

const normalizeTweet = object => stringifyObjectValue(setBiggerProfileImageUrl(object))

const setPostTweet = async (postTitle, tweet) => {
  return await db.collection(`posts2/${postTitle}/tweets`)
    .doc(tweet.id_str)
    .set(normalizeTweet(tweet))
}

module.exports.getTweetsByPost = getTweetsByPost
module.exports.setPostTweet = setPostTweet
