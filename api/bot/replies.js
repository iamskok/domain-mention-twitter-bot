import getTweetsByPost from "../firestore/get-tweets-by-post.js"
import getTweetReplies from "../firestore/get-tweet-replies.js"
import setTweetReplies from "../firestore/set-tweet-replies.js"
import getAllPosts from "../firestore/get-all-posts.js"
import searchTweetReplies from "../twitter/search-tweet-replies.js"

const replies = () => {
  getAllPosts().then(posts => {
    posts.forEach(async doc => {
      const postTitle = doc.id
      const tweets = await getTweetsByPost(postTitle)
  
      tweets.forEach(async tweet => {
        const tweetData = tweet.data()
        const tweetId = tweetData.id_str

        const oldReplies = await getTweetReplies(postTitle, tweetId)
        const replies = await searchTweetReplies(tweetData, oldReplies)

        await setTweetReplies(postTitle, tweetId, replies)
      })
    })
  })
}

export default replies
