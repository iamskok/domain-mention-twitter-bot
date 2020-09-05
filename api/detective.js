const {
  getTweetsByPost,
  setTweet,
  setTweetReplies,
  setTweetQuote,
  getAllPosts,
} = require("./db")
const {
  readUserTimelineTweets,
  readSearchTweets,
  readStreamTweets,
  searchTweetReplies,
} = require("./twitter")

const timeline = domainName => readUserTimelineTweets(domainName, setTweet)

const search = domainName => readSearchTweets(domainName, setTweet)

const stream = domainName => readStreamTweets(domainName, setTweetQuote, setTweet)

const replies = domainName => {
  getAllPosts().then(posts => {
    posts.forEach(async doc => {
      const postTitle = doc.id
      const tweets = await getTweetsByPost(postTitle)
  
      tweets.forEach(tweet => {
        searchTweetReplies(domainName, tweet.data(), setTweetReplies)
      })
    })
  })
}

module.exports.timeline = timeline
module.exports.search = search
module.exports.stream = stream
module.exports.replies = replies