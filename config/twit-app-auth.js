const Twit = require("twit")
const genericTweeterAuth = require("./generic-tweeter-auth")

require("dotenv").config({ path: __dirname + "/../.env" })

// Used for `search/tweets` endpoint for a greater request limit.
const twitAppAuth = new Twit({
  ...genericTweeterAuth,
  app_only_auth: true,
})

module.exports = twitAppAuth
