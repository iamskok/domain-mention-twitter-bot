const getTweetsByPost = require("../firestore/get-tweets-by-post")
const getTweetReplies = require("../firestore/get-tweet-replies")
const setTweetReplies = require("../firestore/set-tweet-replies")
const getAllPosts = require("../firestore/get-all-posts")
const searchTweetReplies = require("../twitter/search-tweet-replies")

const replies = () => {
  getAllPosts().then(posts => {
    posts.forEach(async doc => {
      const postTitle = doc.id
      const tweets = await getTweetsByPost(postTitle)
  
      tweets.forEach(async tweet => {
        const tweetData = tweet.data()
        const tweetId = tweetData.id_str

        const oldReplies = await getTweetReplies(postTitle, tweetId)
        const replies = await searchTweetReplies(tweetData, oldReplies)

        await setTweetReplies(postTitle, tweetId, replies)
      })
    })
  })
}

module.exports = replies