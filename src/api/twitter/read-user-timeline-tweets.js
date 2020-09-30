import twitUserAuth from '../../services/twit-user-auth';
import getPostTitle from '../../utils/get-post-title';
import normalizeTweet from '../../utils/normalize-tweet';
import logger from '../../services/logger';
import TWITTER_TIMEOUT from '../../constants/twitter';

// Find all personal tweets mentioning `domainName` via `statuses/user_timeline` endpoint.
const readUserTimelineTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter `twitter/readUserTimelineTweets`');

  twitUserAuth.get(
    'statuses/user_timeline',
    {
      count: 200,
    },
    (error, data, response) => {
      if (error) {
        // Handle "Rate limit exceeded." error. Error code 88.
        if (error.message.toLowerCase().includes('rate limit exceeded')) {
          logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
          logger.log('verbose', 'Wait for 15mins before calling `twitter/readUserTimelineTweets`');

          setTimeout(async () => {
            logger.log('verbose', 'Call `twitter/readUserTimelineTweets` again after 15mins wait');

            readUserTimelineTweets(domainName, setTweet);
          }, TWITTER_TIMEOUT);
        } else {
          logger.log('error', 'Error in `twitter/readUserTimelineTweets` => `twitUserAuth.get`', {
            errorObject: error,
          });

          throw new Error(error);
        }
      } else if (response.statusCode === 200) {
        logger.log('debug', 'Twitter API returned status code 200');

        data.map(normalizeTweet).forEach((tweet) => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            if (url.includes(domainName)) {
              logger.log('debug', `Tweet includes ${domainName} URL`);

              const postTitle = getPostTitle(url);

              if (postTitle) {
                await setTweet(postTitle, tweet);
              }
            }
          });
        });
      }

      logger.log('info', '>>>> Exit `twitter/readUserTimelineTweets`');
    },
  );
};

export default readUserTimelineTweets;
