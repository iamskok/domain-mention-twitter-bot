const {
  getTweetsByPost,
  setTweet,
  getTweetReplies,
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

module.exports.timeline = timeline
module.exports.search = search
module.exports.stream = stream
module.exports.replies = replies