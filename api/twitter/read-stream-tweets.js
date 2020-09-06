const twitUserAuth = require("../../config/twit-user-auth")
const getPostTitle = require("../../utils/get-post-title")
const normalizeTweet = require("../../utils/normalize-tweet")

// Subscribe to the stream mentioning `domainName` via `statuses/filter` endpoint.
const readStreamTweets = (domainName, setTweetQuote, setTweet) => {
  twitUserAuth.stream(
    `statuses/filter`,
    {
      // Check "Track" section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
      // Use “example com” as the track parameter for “example.com”
      track: domainName.replace(`.`, ` `)
    }
  ).on(`tweet`, tweet => {
    // Avoid catching retweets.
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

module.exports = readStreamTweets
