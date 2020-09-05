// Get post title from URL
const getPostTitle = (url, base = `blog`) => {
  let { pathname } = new URL(url)
  let postTitle

  while(pathname.startsWith(`/`)) {
    pathname = pathname.slice(1)
  }

  if (pathname.startsWith(base + `/`)) {
    postTitle = pathname.slice(base.length + 1).replace(/\//g, ``)
  }

  return postTitle
}

// Resolve Gatsby issue with ID field being a number
const stringifyIds = tweet => {
  if (tweet?.id && typeof tweet?.id === `number`) {
    tweet.id = tweet.id.toString()
  }

  if (tweet?.quoted_status?.id && typeof tweet?.quoted_status?.id === `number`) {
    tweet.quoted_status.id = tweet.quoted_status.id.toString()
  }

  return tweet
}

// Set `profile_image_url_https` in quote and reply to 400x400
const setProfileImageUrls = tweet => {
  if (tweet?.user?.profile_image_url_https) {
    tweet.user.profile_image_url_https = tweet.user.profile_image_url_https
      .replace(/_normal/, `_400x400`)
  }

  if (tweet?.quoted_status?.user?.profile_image_url_https) {
    tweet.quoted_status.user.profile_image_url_https = tweet.quoted_status.user.profile_image_url_https
      .replace(/_normal/, `_400x400`)
  }

  return tweet
}

const normalizeTweet = tweet => stringifyIds(setProfileImageUrls(tweet))

module.exports.getPostTitle = getPostTitle
module.exports.normalizeTweet = normalizeTweet
