import twitUserAuth from '../../services/twit-user-auth';
import getPostTitle from '../../utils/get-post-title';
import normalizeTweet from '../../utils/normalize-tweet';
import tweetURL from '../../utils/tweet-url';
import logger from '../../services/logger';

// Subscribe to the stream mentioning `domainName` via `statuses/filter` endpoint.
const readStreamTweets = (domainName, setTweet) => {
  twitUserAuth.stream(
    'statuses/filter',
    {
      // Check "Track" section https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters
      // Use “example com” as the track parameter for “example.com”
      track: domainName?.replace('.', ' '),
    },
  ).on('tweet', (tweet) => {
    // Avoid catching retweets and quotes.
    if (!tweet.retweeted_status && !tweet.quoted_status_id_str) {
      // Handle new tweet case.
      tweet.entities?.urls?.some(async ({ expanded_url: url }) => {
        if (url.includes(domainName)) {
          logger.log('info', `twitter/readStreamTweets received tweet ${tweetURL(tweet)}, which satisfies search criteria`);

          const postTitle = getPostTitle(url);

          if (postTitle) {
            await setTweet(postTitle, normalizeTweet(tweet));
            return true;
          }
        }

        return false;
      });
    }
  })
    .on('limit', (limitMessage) => logger.log('warning', 'twitter/readStreamTweets limitation occurred', { limitMessage }))
    .on('disconnect', (disconnectMessage) => logger.log('warning', 'twitter/readStreamTweets got disconnected', { disconnectMessage }))
    .on('connect', (request) => logger.log('debug', 'twitter/readStreamTweets connection attempt', { request }))
    .on('connected', (response) => {
      logger.log('info', 'twitter/readStreamTweets got connected');
      logger.log('debug', 'twitter/readStreamTweets got connected', { response });
    })
    .on('error', (error) => logger.log('error', 'twitter/readStreamTweets received error in Twitter stream API request or response', { errorObject: error }))
    .on('warning', (warning) => logger.log('warning', 'twitter/readStreamTweets connection is falling behind', { warning }))
    .on('reconnect', (request, response, connectInterval) => {
      logger.log('warning', 'twitter/readStreamTweets reconnection attempt', {
        request,
        response,
        connectInterval,
      });
    });
};

export default readStreamTweets;
