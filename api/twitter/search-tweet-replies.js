const twitAppAuth = require("../../config/twit-app-auth")
const dedupeTweets = require("../../utils/dedupe-tweets")

// Search replies for all tweets that are stored in the DB via `search/tweets` endpoint.
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
            const newReplies = data.statuses.filter(
              tweet => tweet.in_reply_to_status_id_str === tweetId
            )

            // All replies of the current tweet (can include current and nested replies).
            const replies = dedupeTweets(oldReplies, newReplies)

            // All transformed replies of the current tweet.
            const updatedReplies = []

            for (let i = 0; i < replies.length; i++) {
              const childTweet = replies[i]
              const childReplies = childTweet.replies || []

              // Search all replies of the child tweet.
              childTweet.replies = await searchTweetReplies(childTweet, childReplies)
              updatedReplies.push(childTweet)
            }

            resolve(updatedReplies)
          }
        }
    })
  })
}

module.exports = searchTweetReplies
