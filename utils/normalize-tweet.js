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

// Remove nested array of coordinates (Firestore limitation).
// https://stackoverflow.com/questions/54785637/cloud-functions-error-cannot-convert-an-array-value-in-an-array-value
const removePlaceBoundingBoxCoordinates = (tweet) => {
  const transformedTweet = { ...tweet };

  delete transformedTweet?.place?.bounding_box?.coordinates;
  delete transformedTweet?.quoted_status?.place?.bounding_box?.coordinates;
  delete transformedTweet?.retweeted_status?.place?.bounding_box?.coordinates;
  delete transformedTweet?.retweeted_status?.quoted_status?.place?.bounding_box?.coordinates;
  delete transformedTweet?.quoted_status?.retweeted_status?.place?.bounding_box?.coordinates;

  return transformedTweet;
};

// Apply all tweet updates at once.
const normalizeTweet = (tweet) => removePlaceBoundingBoxCoordinates(
  stringifyIds(setProfileImageUrls(tweet)),
);

export default normalizeTweet;
