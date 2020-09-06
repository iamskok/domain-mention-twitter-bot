import setTweet from "../firestore/set-tweet.js"
import setTweetQuote from "../firestore/set-tweet-quote.js"
import readStreamTweets from "../twitter/read-stream-tweets.js"

const stream = domainName => readStreamTweets(domainName, setTweetQuote, setTweet)

export default stream
