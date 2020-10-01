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
      track: domainName.replace('.', ' '),
    },
  ).on('tweet', (tweet) => {
    // Avoid catching retweets and quotes.
    if (!tweet.retweeted_status && !tweet.quoted_status_id_str) {
      // Handle new tweet case.
      tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
        if (url.includes(domainName)) {
          logger.log('info', `Received valid tweet ${tweetURL(tweet)} from Twitter stream`);

          const postTitle = getPostTitle(url);

          if (postTitle) {
            await setTweet(postTitle, normalizeTweet(tweet));
          }
        }
      });
    }
  })
    .on('limit', (limitMessage) => logger.log('warning', 'Limitation occurred in Twitter stream', { limitMessage }))
    .on('disconnect', (disconnectMessage) => logger.log('warning', 'Disconnect from Twitter stream', { disconnectMessage }))
    .on('connect', (request) => logger.log('debug', 'Connection attempt to Twitter stream', { request }))
    .on('connected', (response) => {
      logger.log('info', 'Connected to Twitter stream');
      logger.log('debug', 'Connected to Twitter stream', { response });
    })
    .on('error', (error) => logger.log('error', 'Error occurred in Twitter stream API request or response', { errorObject: error }))
    .on('warning', (warning) => logger.log('warning', 'Connection is falling behind in Twitter stream', { warning }))
    .on('reconnect', (request, response, connectInterval) => {
      logger.log('warning', 'Reconnection attempt to Twitter stream is scheduled', {
        request,
        response,
        connectInterval,
      });
    });
};

export default readStreamTweets;
