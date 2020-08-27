const bot = require("./bot")
const { getTweetsByPost, setPostTweet } = require("./db")
const { getPostTitle } = require("./helpers")

const handleTweetURL = async (targetString, url, tweet) => {
  if (url.includes(targetString)) {
    const postTitle = getPostTitle(url)
    if (postTitle) {
      console.log(postTitle)
      await setPostTweet(postTitle, tweet)
    }
  }
}

const targetString = process.env.TARGET_DOMAIN

// Find all personal tweets mentioning `targetString` and save them.
const writeUserTimelineTweets = (userTimelineOptions, targetString) => {
  bot.get(
    `statuses/user_timeline`,
    userTimelineOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        data.forEach(tweet => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            console.log('url', url)
            await handleTweetURL(targetString, url, tweet)
          })
        })
      }
  })
}

const userTimelineOptions = {
  count: 200
}

writeUserTimelineTweets(userTimelineOptions, targetString)

// Search tweets mentioning `targetString` and save them.
const writeSearchTweets = (handleTweetURL, searchTweetsOptions, targetString) => {
  bot.get(
    `search/tweets`,
    searchTweetsOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        data.statuses.forEach(tweet => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            await handleTweetURL(targetString, url, tweet)
          })
        })
      }
  })
}

const searchTweetsOptions = {
  q: `url:${targetString}`,
  count: 100,
}

writeSearchTweets(handleTweetURL, searchTweetsOptions, targetString)

const stream = streamOptions => bot.stream(`statuses/filter`, streamOptions)

// Subscribe to the stream and save them.
const writeStreamTweets = (stream, streamOptions, targetString) => {
  stream(streamOptions).on(`tweet`, tweet => {
    tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
      // await handleTweetURL(targetString, url, tweet)
      console.log(tweet.text)
    })
  })
}

const streamOptions = {
  track: targetString
}

// writeStreamTweets(stream, streamOptions, targetString)
