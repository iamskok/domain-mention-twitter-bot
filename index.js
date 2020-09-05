const {
  timeline,
  search,
  stream,
  replies
} = require("./api/detective")

const domainName = process.env.DOMAIN_NAME

// timeline(domainName)
// search(domainName)
// stream(domainName)
replies(domainName)
