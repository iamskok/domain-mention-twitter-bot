// Convert ID number value to a string.
// Resolves Gatsby's GraphQL limitation with ID.
const stringifyIds = tweet => {
  // Convert ID in tweet.
  if (tweet?.id && typeof tweet?.id === `number`) {
    tweet.id = tweet.id.toString()
  }

  // Convert ID in quote.
  if (tweet?.quoted_status?.id && typeof tweet?.quoted_status?.id === `number`) {
    tweet.quoted_status.id = tweet.quoted_status.id.toString()
  }

  return tweet
}

// Increase avatar size.
// By default tweeter serves 48x48 profile images.
const setProfileImageUrls = tweet => {
  // Increase profile image size to 400x400 in tweet replies.
  if (tweet?.user?.profile_image_url_https) {
    tweet.user.profile_image_url_https = tweet.user.profile_image_url_https
      .replace(/_normal/, `_400x400`)
  }

  // Increase profile image size to 400x400 in tweet quotes.
  if (tweet?.quoted_status?.user?.profile_image_url_https) {
    tweet.quoted_status.user.profile_image_url_https = tweet.quoted_status.user.profile_image_url_https
      .replace(/_normal/, `_400x400`)
  }

  return tweet
}

// Apply all tweet updates at once.
const normalizeTweet = tweet => stringifyIds(setProfileImageUrls(tweet))

export default normalizeTweet
