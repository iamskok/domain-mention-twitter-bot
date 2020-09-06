const setTweet = require("../firestore/set-tweet")
const readSearchTweets = require("../twitter/read-search-tweets")

const search = domainName => readSearchTweets(domainName, setTweet)

module.exports = search
