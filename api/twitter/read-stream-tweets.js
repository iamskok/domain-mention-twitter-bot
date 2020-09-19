import twitUserAuth from '../../services/twit-user-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import normalizeTweet from '../../utils/normalize-tweet.js';

// Subscribe to the stream mentioning `domainName` via `statuses/filter` endpoint.
const readStreamTweets = (domainName, setTweetQuote, setTweet) => {
  twitUserAuth.stream(
    'statuses/filter',
    {
      // Check "Track" section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
      // Use “example com” as the track parameter for “example.com”
      track: domainName.replace('.', ' '),
    },
  ).on('tweet', (tweet) => {
    // Avoid catching retweets.
    if (!tweet.retweeted_status) {
      // Handle tweet is a quote case.
      if (tweet.quoted_status_id_str) {
        tweet.quoted_status.entities.urls.forEach(async ({ expanded_url: url }) => {
          if (url.includes(domainName)) {
            const postTitle = getPostTitle(url);

            if (postTitle) {
              await setTweetQuote(postTitle, normalizeTweet(tweet));
            }
          }
        });
      } else {
        // Handle new tweet case.
        tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
          if (url.includes(domainName)) {
            const postTitle = getPostTitle(url);

            if (postTitle) {
              await setTweet(postTitle, normalizeTweet(tweet));
            }
          }
        });
      }
    }
  });
};

export default readStreamTweets;
