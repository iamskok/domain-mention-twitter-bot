import twitUserAuth from '../../services/twit-user-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import normalizeTweet from '../../utils/normalize-tweet.js';
import tweetURL from '../../utils/tweet-url.js';
import logger from '../../services/logger.js';

// Subscribe to the stream mentioning `domainName` via `statuses/filter` endpoint.
const readStreamTweets = (domainName, setTweet) => {
  logger.log('info', 'Start listening for twitter stream - `twitter/readStreamTweets`');

  twitUserAuth.stream(
    'statuses/filter',
    {
      // Check "Track" section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
      // Use “example com” as the track parameter for “example.com”
      track: domainName.replace('.', ' '),
    },
  ).on('tweet', (tweet) => {
    // Avoid catching retweets and quotes.
    if (!tweet.retweeted_status && !tweet.quoted_status_id_str) {
      logger.log('info', `Received tweet ${tweetURL(tweet)}`);
      // Handle new tweet case.
      tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
        if (url.includes(domainName)) {
          logger.log('debug', `Tweet includes ${domainName} URL`);

          const postTitle = getPostTitle(url);

          if (postTitle) {
            logger.log('verbose', `Add ${tweetURL(tweet)} tweet to ${postTitle}/tweet/${tweet.id_str} document`);

            await setTweet(postTitle, normalizeTweet(tweet));
          }
        }
      });
    }
  });
};

export default readStreamTweets;
