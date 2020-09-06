const Twit = require("twit")
const genericTweeterAuth = require("./generic-tweeter-auth")

require("dotenv").config({ path: __dirname + "/../.env" })

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  ...genericTweeterAuth,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

module.exports = twitUserAuth
