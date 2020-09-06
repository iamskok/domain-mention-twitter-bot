const timeline = require("./api/bot/timeline")
const search = require("./api/bot/search")
const stream = require("./api/bot/stream")
const replies = require("./api/bot/replies")

const domainName = process.env.DOMAIN_NAME

timeline(domainName)
search(domainName)
replies(domainName)
stream(domainName)
