const twitAppAuth = require("../config/twit-app-auth")
const twitUserAuth = require("../config/twit-user-auth")
const getPostTitle = require("../utils/get-post-title")
const normalizeTweet = require("../utils/normalize-tweet")
const dedupeTweets = require("../utils/dedupe-tweets")

// Find all personal tweets mentioning `domainName`.
const readUserTimelineTweets = (domainName, setTweet) => {
  twitUserAuth.get(
    `statuses/user_timeline`,
    {
      count: 200
    },
    (error, data, response) => {
      if (error) {
        console.error(error)
      } else {
        if (response.statusCode === 200) {
          data.forEach(tweet => {
            tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
              if (url.includes(domainName)) {
                const postTitle = getPostTitle(url)

                if (postTitle) {
                  await setTweet(postTitle, tweet)
                }
              }
            })
          })
        }
      }
  })
}

// Find tweets mentioning `domainName`.
const readSearchTweets = (domainName, setTweet) => {
  twitAppAuth.get(
    `search/tweets`,
    {
      q: `url:${domainName}`,
      count: 100,
    },
    (error, data, response) => {
      if (error) {
        console.error(error)
      } else {
        if (response.statusCode === 200) {
          data.statuses.forEach(tweet => {
            tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
              if (url.includes(domainName)) {
                const postTitle = getPostTitle(url)

                if (postTitle) {
                  await setTweet(postTitle, tweet)
                }
              }
            })
          })
        }
      }
  })
}

// Subscribe to the stream mentioning `domainName`.
const readStreamTweets = (domainName, setTweetQuote, setTweet) => {
  twitUserAuth.stream(
    `statuses/filter`,
    {
      // Check "Track" section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
      // Use “example com” as the track parameter for “example.com”
      track: domainName.replace(`.`, ` `)
    }
  ).on(`tweet`, tweet => {
    // Ignore retweets. (and `!tweet.in_reply_to_status_id_str`?)
    if (!tweet.retweeted_status) {
      if (tweet.quoted_status_id_str) {
        const quote = tweet
        quote.quoted_status.entities.urls.forEach(async ({ expanded_url: url }) => {
          if (url.includes(domainName)) {
            const postTitle = getPostTitle(url)

            if (postTitle) {
              await setTweetQuote(postTitle, normalizeTweet(quote))
            }
          }
        })
      } else {
        tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
          if (url.includes(domainName)) {
            const postTitle = getPostTitle(url)

            if (postTitle) {
              await setTweet(postTitle, normalizeTweet(tweet))
            }
          }
        })
      }
    }
  })
}

const searchTweetReplies = async (tweet, oldReplies) => {
  const userName = tweet.user.screen_name
  const tweetId = tweet.id_str

  return new Promise((resolve, reject) => {
    twitAppAuth.get(
      `search/tweets`,
      {
        q: `to:${userName}`,
        count: 100,
        sinceId: tweetId
      },
      async (error, data, response) => {
        if (error) {
          reject(error)
        } else {
          if (response.statusCode === 200) {
            const newReplies = data.statuses
              .filter(
                tweet => tweet.in_reply_to_status_id_str === tweetId
              )

            // All replies for current tweet (can include current and nested replies)
            const replies = dedupeTweets(oldReplies, newReplies)

            // All transformed replies for current tweet
            const updatedReplies = []

            for (let i = 0; i < replies.length; i++) {
              const childTweet = replies[i]
              const childReplies = childTweet.replies || []

              // Search all replies for a child tweet
              childTweet.replies = await searchTweetReplies(childTweet, childReplies)
              updatedReplies.push(childTweet)
            }

            resolve(updatedReplies)
          }
        }
    })
  })
}

module.exports.readUserTimelineTweets = readUserTimelineTweets
module.exports.readSearchTweets = readSearchTweets
module.exports.readStreamTweets = readStreamTweets
module.exports.searchTweetReplies = searchTweetReplies
