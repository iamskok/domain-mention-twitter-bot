import twitAppAuth from '../../services/twit-app-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import tweetURL from '../../utils/tweet-url.js';
import logger from '../../services/logger.js';

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
          }, 15 * 60 * 1000);
        } else {
          logger.log('error', 'Error in `twitter/readSearchTweets` => `twitUserAuth.get`', {
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
              logger.log('debug', `Tweet includes ${domainName} URL`);

              const postTitle = getPostTitle(url);

              if (postTitle) {
                logger.log('verbose', `Add ${tweetURL(tweet)} tweet to ${postTitle}/tweet/${tweet.id_str} document`);

                await setTweet(postTitle, tweet);
              }
            }
          });
        });
      }
    },
  );

  logger.log('info', '>>>> Exit `twitter/readSearchTweets`');
};

export default readSearchTweets;
