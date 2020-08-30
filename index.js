const bot = require("./bot")
const {
  writeUserTimelineTweets,
  writeSearchTweets,
  writeStreamTweets,
  searchTweetReplies
} = require("./api")
const {
  setPostTweet,
  setTweetReplies,
  getAllPosts,
  getTweetsByPost
} = require("./db")
const { getPostTitle } = require("./helpers")

const handleTweetURL = async (targetString, url, tweet) => {
  if (url.includes(targetString)) {
    const postTitle = getPostTitle(url)
    if (postTitle) {
      await setPostTweet(postTitle, tweet)
    }
  }
}

const handleTweetReplies = async (postTitle, tweetId, newReplies, oldReplies) => {
  const replies = newReplies
  // Add old/new replies comparison logic
  await setTweetReplies(postTitle, tweetId, replies)
}

const targetString = process.env.TARGET_DOMAIN

writeUserTimelineTweets(
  {
    count: 200
  },
  targetString,
  handleTweetURL,
)

writeSearchTweets(
  {
    q: `url:${targetString}`,
    count: 100,
  },
  targetString,
  handleTweetURL
)

const stream = streamOptions => bot.stream(`statuses/filter`, streamOptions)
writeStreamTweets(
  // Check Track section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
  // You should use “example com” as the track parameter for “example.com”
  stream({ track: targetString.replace(`.`, ` `) }),
  targetString,
  handleTweetURL,
)

getAllPosts().then(posts => {
  posts.forEach(async doc => {
    const postTitle = doc.id
    const tweets = await getTweetsByPost(postTitle)

    tweets.forEach(tweet => {
      searchTweetReplies(postTitle, tweet.data(), handleTweetReplies)
    })
  })
})