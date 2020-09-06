const setTweet = require("../firestore/set-tweet")
const readUserTimelineTweets = require("../twitter/read-user-timeline-tweets")

const timeline = domainName => readUserTimelineTweets(domainName, setTweet)

module.exports = timeline
