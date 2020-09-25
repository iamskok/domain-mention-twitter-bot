import twitUserAuth from '../../services/twit-user-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import normalizeTweet from '../../utils/normalize-tweet.js';
import logger from '../../services/logger.js';

// Subscribe to the stream mentioning `domainName` via `statuses/filter` endpoint.
const readStreamTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter readStreamTweets');

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
      logger.log('info', `Received https://twitter.com/${tweet.user.screen_name}/statuses/${tweet.id_str} tweet`);
      // Handle new tweet case.
      tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
        if (url.includes(domainName)) {
          logger.log('debug', `Tweet includes ${domainName} URL`);

          const postTitle = getPostTitle(url);

          logger.log('debug', `Tweet relates to ${postTitle} blog post`);

          if (postTitle) {
            await setTweet(postTitle, normalizeTweet(tweet));

            logger.log('debug', `Add tweet to ${postTitle} document`);
          }
        }
      });
    }
  });
};

export default readStreamTweets;
