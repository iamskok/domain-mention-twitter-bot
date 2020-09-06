const setTweet = require("../firestore/set-tweet")
const setTweetQuote = require("../firestore/set-tweet-quote")
const readStreamTweets = require("../twitter/read-stream-tweets")

const stream = domainName => readStreamTweets(domainName, setTweetQuote, setTweet)

module.exports = stream
