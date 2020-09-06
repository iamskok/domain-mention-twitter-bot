require("dotenv").config({ path: __dirname + "/../.env" })

// Generic config used in App and User auth.
const genericTweeterAuth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  timeout_ms: 60 * 1000,
}

module.exports = genericTweeterAuth
