// Convert ID number value to a string.
// Resolves Gatsby's GraphQL limitation with ID.
const stringifyIds = (tweet) => {
  const transformedTweet = { ...tweet };
  // Convert ID in tweet.
  if (tweet?.id && typeof tweet?.id === 'number') {
    transformedTweet.id = tweet.id.toString();
  }

  // Convert ID in quote.
  if (tweet?.quoted_status?.id && typeof tweet?.quoted_status?.id === 'number') {
    transformedTweet.quoted_status.id = tweet.quoted_status.id.toString();
  }

  return transformedTweet;
};

// Increase avatar size.
// By default tweeter serves 48x48 profile images.
const setProfileImageUrls = (tweet) => {
  const transformedTweet = { ...tweet };
  // Increase profile image size to 400x400 in tweet replies.
  if (tweet?.user?.profile_image_url_https) {
    transformedTweet.user.profile_image_url_https = tweet.user.profile_image_url_https
      .replace(/_normal/, '_400x400');
  }

  // Increase profile image size to 400x400 in tweet quotes.
  if (tweet?.quoted_status?.user?.profile_image_url_https) {
    transformedTweet.quoted_status.user.profile_image_url_https = tweet
      .quoted_status.user.profile_image_url_https.replace(/_normal/, '_400x400');
  }

  return transformedTweet;
};

const removeExtraData = (tweet) => {
  /* eslint-disable camelcase */
  const {
    created_at,
    text,
    id_str,
    user: {
      name,
      profile_image_url_https,
      screen_name,
    },
    entities,
    in_reply_to_status_id_str,
    quoted_status_id_str,
    replies,
    quotes,
  } = { ...tweet };

  const transformedTweet = {
    created_at,
    text,
    id_str,
    user: {
      name,
      profile_image_url_https,
      screen_name,
    },
    entities,
    in_reply_to_status_id_str: in_reply_to_status_id_str || '',
    quoted_status_id_str: quoted_status_id_str || '',
    replies,
    quotes,
  };
  /* eslint-enable camelcase */

  return transformedTweet;
};

// Apply all tweet updates at once.
const normalizeTweet = (tweet) => removeExtraData(stringifyIds(setProfileImageUrls(tweet)));

export default normalizeTweet;
