import twitUserAuth from "../../config/twit-user-auth.js"
import getPostTitle from "../../utils/get-post-title.js"

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

export default readUserTimelineTweets

