// Get post title from URL
const getPostTitle = (url, base = `/blog/`) => {
  const { pathname } = new URL(url)
  let postTitle

  if (pathname.startsWith(base)) {
    postTitle = pathname.slice(base.length)

    if (postTitle.endsWith(`/`)) {
      postTitle = postTitle.slice(0, postTitle.length - 1)
    }
  }

  return postTitle
}

// Handles Gatsby ID field being a number type
const stringifyObjectValue = (object, key = `id`) => {
  if (typeof object[key] === `number`) {
    object[key] = object[key].toString()
  }

  return object
}

// Set `profile_image_url_https` to 400x400
const setBiggerProfileImageUrl = object => {
  if (object.user.profile_image_url_https) {
    object.user.profile_image_url_https = object.user.profile_image_url_https.replace(/_normal/, `_400x400`)
  }

  return object
}

const normalizeTweet = object => stringifyObjectValue(setBiggerProfileImageUrl(object))

module.exports.getPostTitle = getPostTitle
module.exports.stringifyObjectValue = stringifyObjectValue
module.exports.setBiggerProfileImageUrl = setBiggerProfileImageUrl
module.exports.normalizeTweet = normalizeTweet
