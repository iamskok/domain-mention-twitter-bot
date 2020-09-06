import setTweet from "../firestore/set-tweet.js"
import readSearchTweets from "../twitter/read-search-tweets.js"

const search = domainName => readSearchTweets(domainName, setTweet)

export default search
