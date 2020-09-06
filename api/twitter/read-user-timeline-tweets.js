const twitUserAuth = require("../../config/twit-user-auth")
const getPostTitle = require("../../utils/get-post-title")

// Find all personal tweets mentioning `domainName` via `statuses/user_timeline` endpoint.
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

module.exports = readUserTimelineTweets
