const twitAppAuth = require("../../config/twit-app-auth")
const getPostTitle = require("../../utils/get-post-title")

// Find tweets mentioning `domainName` via `search/tweets` endpoint.
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

module.exports = readSearchTweets
