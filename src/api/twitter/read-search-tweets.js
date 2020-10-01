import twitAppAuth from '../../services/twit-app-auth';
import getPostTitle from '../../utils/get-post-title';
import tweetURL from '../../utils/tweet-url';
import logger from '../../services/logger';
import TWITTER_TIMEOUT from '../../constants/twitter';

// Find tweets mentioning `domainName` via `search/tweets` endpoint.
const readSearchTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter `twitter/readSearchTweets`');

  twitAppAuth.get(
    'search/tweets',
    {
      q: `url:${domainName}`,
      count: 100,
    },
    (error, data, response) => {
      logger.log('debug', 'Call twitAppAuth.get() with', {
        endpoint: 'search/tweets',
        options: {
          q: `url:${domainName}`,
          count: 100,
        },
      });

      if (error) {
        // Handle "Rate limit exceeded." error. Error code 88.
        if (error.message.toLowerCase().includes('rate limit exceeded')) {
          logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
          logger.log('verbose', 'Wait for 15mins before calling `twitter/readSearchTweets`');

          setTimeout(async () => {
            logger.log('verbose', 'Call `twitter/searchTweetResponses` again after 15mins wait');

            readSearchTweets(domainName, setTweet);
          }, TWITTER_TIMEOUT);
        } else {
          logger.log('error', '`twitter/readSearchTweets` => `twitUserAuth.get`', {
            endpoint: 'search/tweets',
            options: {
              q: `url:${domainName}`,
              count: 100,
            },
          },
          {
            errorObject: error,
          });

          throw new Error(error);
        }
      } else if (response.statusCode === 200) {
        logger.log('debug', 'Twitter API returned status code 200');

        data.statuses.forEach((tweet) => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            if (url.includes(domainName)) {
              logger.log('verbose', `Found valid tweet ${tweetURL(tweet)} via Twitter search`);

              const postTitle = getPostTitle(url);

              if (postTitle) {
                await setTweet(postTitle, tweet);
              }
            }
          });
        });
      }

      logger.log('info', '>>>> Exit `twitter/readSearchTweets`');
    },
  );
};

export default readSearchTweets;
