const bot = require("./bot")

const DB = {
  tweets: []
}

const targetString = `skok.club`

const userTimelineOptions = {
  count: 200
}

// Find all personal tweets mentioning `targetString` and save them.
const getUserTimeline = () => {
  bot.get(
    `statuses/user_timeline`,
    userTimelineOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        data.forEach(tweet => {
          tweet.entities.urls.forEach(({ expanded_url: url }) => {
            if (url.includes(targetString)) {
              DB.tweets.push(tweet)
            }
          })
        })
      }
  })
}

getUserTimeline()

const searchTweetsOptions = {
  q: `url:${targetString}`,
  count: 100,
}

// Search tweets mentioning `targetString` and save them.
const getTweets = () => {
  bot.get(
    `search/tweets`,
    searchTweetsOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        data.statuses.forEach(tweet => {
          tweet.entities.urls.forEach(({ expanded_url: url }) => {
            if (url.includes(targetString)) {
              DB.tweets.push(tweet)
            }
          })
        })
      }
  })
}

getTweets()

const streamOptions = {
  track: `${targetString}`
}

const stream = bot.stream(`statuses/filter`, streamOptions)

// Subscribe to the stream and save them.
const getStream = () => {
  stream.on(`tweet`, tweet => {
    tweet.entities.urls.forEach(({ expanded_url: url }) => {
      if (url.includes(targetString)) {
        DB.tweets.push(tweet)
      }
    })
  })
}

getStream()