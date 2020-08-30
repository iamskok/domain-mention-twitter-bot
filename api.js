const bot = require("./bot")

// Find all personal tweets mentioning `targetString` and save them.
const writeUserTimelineTweets = (userTimelineOptions, targetString, handleTweetURL) => {
  bot.get(
    `statuses/user_timeline`,
    userTimelineOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        if (response.statusCode === 200) {
          data.forEach(tweet => {
            tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
              await handleTweetURL(targetString, url, tweet)
            })
          })
        }
      }
  })
}

// Search tweets mentioning `targetString` and save them.
const writeSearchTweets = (searchTweetsOptions, targetString, handleTweetURL) => {
  bot.get(
    `search/tweets`,
    searchTweetsOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        if (response.statusCode === 200) {
          data.statuses.forEach(tweet => {
            tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
              await handleTweetURL(targetString, url, tweet)
            })
          })
        }
      }
  })
}

// Subscribe to the stream and save them.
const writeStreamTweets = (stream, targetString, handleTweetURL) => {
  stream.on(`tweet`, tweet => {
    tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
      await handleTweetURL(targetString, url, tweet)
    })
  })
}

const searchTweetReplies = (postTitle, tweet, handleTweetReplies) => {
  const userName = tweet.user.screen_name
  const tweetId = tweet.id_str
  bot.get(
    `search/tweets`,
    {
      q: `to:${userName}`,
      count: 100,
      sinceId: tweetId
    },
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        if (response.statusCode === 200) {
          const newReplies = data.statuses
            .filter(
              tweet => tweet.in_reply_to_status_id_str === tweetId
            )
          const oldReplies = tweet.replies
          handleTweetReplies(postTitle, tweetId, newReplies, oldReplies)
        }
      }
  })
}

module.exports.writeUserTimelineTweets = writeUserTimelineTweets
module.exports.writeSearchTweets = writeSearchTweets
module.exports.writeStreamTweets = writeStreamTweets
module.exports.searchTweetReplies = searchTweetReplies