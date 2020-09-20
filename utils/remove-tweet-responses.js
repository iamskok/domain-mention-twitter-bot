// Remove all children replies and quotes from tweet.
const removeTweetResponses = (tweet) => {
  const normalizedTweet = { ...tweet };
  delete normalizedTweet.replies;
  delete normalizedTweet.quotes;

  return normalizedTweet;
};

export default removeTweetResponses;
